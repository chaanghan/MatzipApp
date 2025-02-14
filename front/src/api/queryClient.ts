import {QueryClient} from '@tanstack/react-query';

// react query는 요청이 실패하면 3번 재요청을 하게 되는데 이를 비활성화
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

export default queryClient;
