import axios from 'axios'

const userInstances = axios.create({
    baseURL: 'http://localhost:3030',
    // headers :{
    //     Authorization:`Bearer ${localStorage.getItem('userToken')}`
    // },
})


userInstances.interceptors.request.use(
    (config) => {

      const token = localStorage.getItem('userToken');
      console.log("check user token ",token);
      
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`; // Attach token to Authorization header
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export {userInstances}