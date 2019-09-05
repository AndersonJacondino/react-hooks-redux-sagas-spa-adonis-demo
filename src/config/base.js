import axios from 'axios';

const base = axios.create({
  baseURL: 'http://127.0.0.1:3333/',
  headers: {
    'content-type': 'application/json'
  }
});

// base.interceptors.response.use((response) => {
//   return response;
// }, (error) => {
//   // if (error.response.status === 401) {
//   //   // store.commit('logout');
//   // }
//   return Promise.reject(error);
// });

// set token in header authorization
base.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? `bearer ${token}` : '';
  return config;
});

export default base;