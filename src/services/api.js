import axios from 'axios';

const instance = axios.create({
  baseURL: '/api',
  timeout: 8000,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default instance;
