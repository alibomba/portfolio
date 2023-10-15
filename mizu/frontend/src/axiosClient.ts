import axios from "axios";

const axiosClient = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api`,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
});

export default axiosClient;