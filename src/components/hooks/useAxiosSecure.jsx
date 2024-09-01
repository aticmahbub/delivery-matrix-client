import axios from 'axios';

 const axiosSecure = axios.create({
    baseURL: 'http://localhost:3000'
    // baseURL: 'https://deliver-matrix-server.vercel.app'
})
const useAxiosSecure = () => {
    return axiosSecure
};

export default useAxiosSecure;