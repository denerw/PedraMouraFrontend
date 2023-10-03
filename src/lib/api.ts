import axios from "axios";

//defining main route - so you dont need to inform all the time
export const api = axios.create({
    baseURL: 'http://localhost:3333'
})