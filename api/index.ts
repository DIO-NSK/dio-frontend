import axios from "axios";
import {jwtDecode} from "jwt-decode";

export const BASE_URL: string = "https://diowater.ru/api"

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const unauthorizedApi = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if (accessToken) {
        const token = jwtDecode(accessToken)
        if (Date.now() <= token.exp!! * 1000) {
            config.headers.Authorization = `Bearer ${accessToken}`
        } else {
            localStorage.removeItem("ACCESS_TOKEN")
        }
    }
    return config
})

api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config
    if ((error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
        originalRequest._retry = true
        const response = await axios.put(
            `${BASE_URL}/user/refresh`,
            null, {withCredentials: true})
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
        return api(originalRequest)
    } else return Promise.reject(error.response.data.message)
})

export const getRequest = async (...args: any[]): Promise<any> => {
    return api.get(args[0], args[1])
        .then(response => response.data)
}