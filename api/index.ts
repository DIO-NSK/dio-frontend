import axios from "axios";
import {Auth} from "@/types/AuthContextType";

const BASE_URL: string = "https://diowater.ru/api"

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
    return config
})

api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 400 && !originalRequest._isRetry) {
        originalRequest._isRetry = true
        const response = await axios.put<Auth>(
            `${BASE_URL}/user/refresh`, null, {withCredentials : true})
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
        return api.request(originalRequest)
    }
})

export const getRequest = async (...args: any[]): Promise<any> => {
    return api.get(args[0], args[1])
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}