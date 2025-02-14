import {useMutation, useQuery} from '@tanstack/react-query';
import {
  getAccessToken,
  getProfile,
  logout,
  postLogin,
  postSignup,
} from '@/api/auth';
import {UseMutationCustomOptions, UseQueryCustomOptions} from '@/types/common';
import {removeEncryptStorage, setEncryptStorage} from '@/utils/encryptStorage';
import {removeHeader, setHeader} from '@/utils/header';
import {useEffect} from 'react';
import queryClient from '@/api/queryClient';
import {queryKeys, storageKeys} from '@/constants/keys';
import {numbers} from '@/constants/numbers';

// 회원가입
function useSignup(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postSignup,
    ...mutationOptions,
  });
}

// 로그인
function useLogin(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: postLogin,

    // 성공하면
    onSuccess: ({accessToken, refreshToken}) => {
      setEncryptStorage(storageKeys.REFRESH_TOKEN, refreshToken); // 스토리지에 리프레쉬 토큰 저장
      setHeader('Authorization', `Bearer ${accessToken}`); // 헤더에 액세스 토큰 저장
    },

    // 성공, 실패와 상관없이 실행
    onSettled: () => {
      // 토큰의 갱신이 처음 로그인을 했을 때도 옵션에 따라 로직이 동작하도록 하기 위함
      queryClient.refetchQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
      }); // 해당 쿼리 키를 refetch

      // 로그인한 뒤에도 다시 남아있는 프로필 데이터도 변경해야할 수 있기 때문에 쿼리를 stale(오래된) 데이터로 만들기 위해서
      queryClient.invalidateQueries({
        queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
      }); // 해당 쿼리 키를 무효화 시킴
    },
    ...mutationOptions,
  });
}

// refresh token으로 access token을 갱신
function useGetRefreshToken() {
  // access token 유효시간 30분보다 조금 적게 설정
  const {isSuccess, data, isError} = useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_ACCESS_TOKEN],
    queryFn: getAccessToken,
    staleTime: numbers.ACCESS_TOKEN_REFRESH_TIME,
    refetchInterval: numbers.ACCESS_TOKEN_REFRESH_TIME, // refetch 주기 설정
    refetchOnReconnect: true, // 다른 작업을 했다가 다시 돌아와도 자동 갱신이 되도록 설정
    refetchIntervalInBackground: true, // 백그라운드에서도 refetch 될 수 있또록 설정
  });

  // useQuery가 성공할 경우
  useEffect(() => {
    if (isSuccess) {
      setHeader('Authorization', `Bearer ${data.accessToken}`); // 헤더에 액세스 토큰 추가
      setEncryptStorage(storageKeys.REFRESH_TOKEN, data.refreshToken); // storage에 리프레쉬 토큰 추가
    }
  }, [isSuccess]);

  // useQuery가 실패할 경우
  useEffect(() => {
    if (isError) {
      removeHeader('Authorization'); // 헤더의 액세스 토큰 삭제
      removeEncryptStorage(storageKeys.REFRESH_TOKEN); // encrypt storage에 리프레쉬 토큰 삭제
    }
  }, [isError]);

  return {isSuccess, isError};
}

// 프로필 가져오기
function useGetProfile(queryOptions?: UseQueryCustomOptions) {
  return useQuery({
    queryKey: [queryKeys.AUTH, queryKeys.GET_PROFILE],
    queryFn: getProfile,
    ...queryOptions,
  });
}

// 로그아웃
function useLogout(mutationOptions?: UseMutationCustomOptions) {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      removeHeader('Authorization'); // 헤더의 액세스 토큰 삭제
      removeEncryptStorage(storageKeys.REFRESH_TOKEN); // encrypt storage에 리프레쉬 토큰 삭제
    },
    onSettled: () => {
      queryClient.invalidateQueries({queryKey: [queryKeys.AUTH]});
    },
    ...mutationOptions,
  });
}

// 인증 관련 훅들
function useAuth() {
  const signupMutation = useSignup();
  const refreshTokenQuery = useGetRefreshToken();
  const getProfileQuery = useGetProfile({
    enabled: refreshTokenQuery.isSuccess, // enabled가 true면 useGetProfile이 실행됨
  });
  const isLogin = getProfileQuery.isSuccess;
  const loginMutation = useLogin();
  const logoutMutation = useLogout();

  return {
    signupMutation,
    loginMutation,
    isLogin,
    getProfileQuery,
    logoutMutation,
  };
}

export default useAuth;
