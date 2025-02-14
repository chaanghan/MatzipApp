import axios from 'axios';
import axiosInstance from './axios';
import {Category, Profile} from '../types/domain';
import {getEncryptStorage} from '../utils/encryptStorage';

type RequestUser = {
  email: string;
  password: string;
};

// 회원가입
const postSignup = async ({email, password}: RequestUser): Promise<void> => {
  const {data} = await axiosInstance.post('/auth/signup', {
    email,
    password,
  });
  return data;
};

type ResponseToken = {
  accessToken: string;
  refreshToken: string;
};

// 로그인
// response body로 access token, refresh token을 받는다.
const postLogin = async ({
  email,
  password,
}: RequestUser): Promise<ResponseToken> => {
  const {data} = await axiosInstance.post('/auth/signin', {
    email,
    password,
  });
  return data;
};

type ResponseProfile = Profile & Category;

// 로그인한 사용자의 프로필 가져오기
const getProfile = async (): Promise<ResponseProfile> => {
  const {data} = await axiosInstance.get('/auth/me');
  return data;
};

// 이 api를 호출할 때는 encryptStorage에 저장된 refresh token을 불러와서 헤더로 넣어주게 된다.
const getAccessToken = async (): Promise<ResponseToken> => {
  const refreshToken = await getEncryptStorage('refreshToken');
  const {data} = await axiosInstance.get('/auth/refresh', {
    headers: {
      Authorization: `Bearer ${refreshToken}`,
    },
  });

  return data;
};

// 로그아웃
const logout = async () => {
  await axiosInstance.post('/auth/logout');
};

export {postSignup, postLogin, getProfile, getAccessToken};

export type {RequestUser, ResponseToken, ResponseProfile};
