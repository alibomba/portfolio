import axios from 'axios';
import accessToken from './utils/accessToken';

const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}/api`
});

axiosClient.interceptors.request.use(
    async (config) => {
        const token = await accessToken();
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);

export default axiosClient;