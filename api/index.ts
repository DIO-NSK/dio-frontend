import axios from "axios";
import {Auth} from "@/types/AuthContextType";

const BASE_URL: string = "https://diowater.ru/api"

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const unauthorizedApi = axios.create({
    baseURL : BASE_URL
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !originalRequest._isRetry && localStorage.getItem("ACCESS_TOKEN")) {
        originalRequest._isRetry = true
        const response = await axios.put<Auth>(
            `${BASE_URL}/user/refresh`, null, {withCredentials: true})
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
        return api.request(originalRequest)
    } else return Promise.reject(error)
})

export const getRequest = async (...args: any[]): Promise<any> => {
    return api.get(args[0], args[1])
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}