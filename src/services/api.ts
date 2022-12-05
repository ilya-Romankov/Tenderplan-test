import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';
import { BASE_URL } from '../constant';

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BASE_URL,
    method: 'GET',
  });

  return api;
};