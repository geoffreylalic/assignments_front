import axios from "axios";

export const HTTP = axios.create({
    baseURL: 'http://localhost:8010/api',
    timeout: 10000
})

