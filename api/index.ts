import axios from "axios";

const BASE_URL : string = "http://diowater.ru:8080/"

export const api = axios.create({
    baseURL: BASE_URL
})

export const apiPrivate = axios.create({
    baseURL : BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials : true
})

export const getRequest = async (...args: any[]) : Promise<any> => {
    return api.get(args[0], args[1])
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}