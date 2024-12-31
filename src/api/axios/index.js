import axios from "axios";
import { store } from '../../app/store';

const axiosInstance = axios.create({
  baseURL: 'https://cos-server-9lb9.onrender.com',
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.authData?.accessToken;
    
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosInstance;