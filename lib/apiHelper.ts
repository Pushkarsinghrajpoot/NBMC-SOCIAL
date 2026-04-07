import axios from "axios";

const apiHelper = axios.create({
    baseURL:"api",
    headers:{
        "Content-Type":"application/json"
    },
    withCredentials: true,
});

// Request interceptors
apiHelper.interceptors.request.use(
    (config) =>{
        return config;
    },
    (error)=> Promise.reject(error)
)

// Response interceptors
apiHelper.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error("API Error:", error.response?.data || error.message);
        } else {
            console.error("Network Error:", error.message);
        }
        return Promise.reject(error);
    }
)

export default apiHelper;