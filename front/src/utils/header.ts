import axiosInstance from '@/api/axios';

function setHeader(key: string, value: string) {
  axiosInstance.defaults.headers.common[key] = value; // 요청마다 일일이 헤더에 액세스 토큰을 넣어줄 필요가 없어짐
}

function removeHeader(key: string) {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
}
export {setHeader, removeHeader};
