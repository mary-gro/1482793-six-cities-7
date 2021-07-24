import axios from 'axios';

const BACKEND_URL = 'https://7.react.pages.academy/six-cities';
const REQUEST_TIMEOUT = 5000;

const HttpCode = {
  UNAUTHORIZED: 401,
};

export const createAPI = (onUnauthorized) => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const onSuccess = (response) => response;

  const onFail = (err) => {
    const {response} = err;

    if (response.status === HttpCode.UNAUTHORIZED) {
      onUnauthorized();
    }

    throw err;
  };

  const onRequest = (config) =>
    Object.assign(
      {},
      {
        ...config,
        headers: {
          ...config.headers,
          'x-token': localStorage.getItem('token'),
        },
      });


  api.interceptors.response.use(onSuccess, onFail);
  api.interceptors.request.use(onRequest);

  return api;
};
