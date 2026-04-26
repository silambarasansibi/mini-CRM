import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

api.interceptors.request.use(
  (config) => {
    try {
      const userStr = localStorage.getItem('user');

      if (userStr) {
        const user = JSON.parse(userStr);

        if (user && user.token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${user.token}`,
          };
        }
      }
    } catch (err) {
      console.error('Token parse error', err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;