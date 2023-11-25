import axios from "axios";

//defining main route - so you dont need to inform all the time
export const api = axios.create({
    baseURL: process.env.REACT_APP_MAIN_API
})