import axios from "axios";

const BASE_URL: string = "https://diowater.ru/api"

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: true
})

export const unauthorizedApi = axios.create({
    baseURL : BASE_URL,
    withCredentials : true
})

api.interceptors.request.use(config => {
    const accessToken = localStorage.getItem("ACCESS_TOKEN")
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`
    return config
})

api.interceptors.response.use(config => config, async (error) => {
    const originalRequest = error.config
    if (error.response.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true
        const response = await axios.put(
            `${BASE_URL}/user/refresh`,
            null, {withCredentials: true})
        localStorage.setItem("ACCESS_TOKEN", response.data.accessToken)
        return api(originalRequest)
    } else if (error.response.status === 401) {
        console.log(error.response)
    }
})

export const getRequest = async (...args: any[]): Promise<any> => {
    return api.get(args[0], args[1])
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}