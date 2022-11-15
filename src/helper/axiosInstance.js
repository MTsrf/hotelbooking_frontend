import axios from "axios";

const axiosInstance = axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_URL}`,
    headers: {
        "Content-type": "application/json"
    }
})

axiosInstance.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401 && error.response.data.vendorBlocked) {
            localStorage.removeItem("vendor")
            window.location.href = "/vendor"
        } else if (error.response.status === 401 && error.response.data.userBlocked) {
            localStorage.removeItem("user")
            window.location.href = "/"
        } else {
            return Promise.reject(error)
        }
    }
);

export default axiosInstance
