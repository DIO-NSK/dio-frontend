import axios from "axios";

export const api = axios.create({
    baseURL : "http://diowater.ru:8080/"
})