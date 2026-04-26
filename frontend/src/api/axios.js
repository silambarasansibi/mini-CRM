import axios from 'axios';

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

api.interceptors.request.use(
  (config) => {
    try {
      const userStr = localStorage.getItem('user');

      if (userStr) {
        const user = JSON.parse(userStr);

        if (user?.token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${user.token}`,
          };
        }
      }
    } catch (err) {
      console.error('Token parse error:', err);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
