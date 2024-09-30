
import  axios  from 'axios';

const adminInstances = axios.create({
    baseURL: 'http://localhost:3030',
})



adminInstances.interceptors.request.use(
    (config) => {

      const adminToken = localStorage.getItem('adminToken');
      if (adminToken) {
        config.headers["Authorization"] = `Bearer ${adminToken}`; // Attach token to Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export {adminInstances}