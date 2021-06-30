import axios, { AxiosRequestConfig } from 'axios';
import { loadState } from '../libs/localStorage';

const authenticatedRequest = () => {
  const extendHeaders = (options: AxiosRequestConfig = {}) => {
    return {
      ...options,
      headers: {
        ...(options.headers || {}),
        ...{
          Authorization: `Bearer ${loadState()?.auth.authData.accessToken}`,
        },
      },
    };
  };

  return {
    get: (url: string, options?: AxiosRequestConfig) => axios.get(url, extendHeaders(options)),
    post: (url: string, data: any, options?: AxiosRequestConfig) => axios.post(url, data, extendHeaders(options)),
    put: (url: string, data: any, options?: AxiosRequestConfig) => axios.put(url, data, extendHeaders(options)),
    delete: (url: string, options?: AxiosRequestConfig) => axios.delete(url, extendHeaders(options)),
  };
};

export default authenticatedRequest();
