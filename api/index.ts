import axios from "axios";

export const api = axios.create({
    baseURL: "http://diowater.ru:8080/"
})

export const getRequest = async (...args: any[]) : Promise<any> => {
    return api.get(args[0], args[1])
        .then(response => response.data)
        .catch(error => {throw Error(error.response.data.message)})
}