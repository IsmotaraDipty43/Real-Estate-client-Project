import axios from 'axios';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Provider/AuthProvider';

// Create the axios instance outside of the hook to avoid re-creation on every render
const axiosSecure = axios.create({
  baseURL: 'https://realstate-server-rouge.vercel.app',
  
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  // Request interceptor to attach the token
  axiosSecure.interceptors.request.use(
    function (config) {
      const token = localStorage.getItem('access-token');
      // console.log('Request intercepted, token:', token);
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle 401/403 errors
  axiosSecure.interceptors.response.use(
    function (response) {
      return response; // Simply return the response for successful requests
    },
    async (error) => {
      const status = error.response?.status;
      if (status === 401 || status === 403) {
       logOut();
        navigate('/login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
