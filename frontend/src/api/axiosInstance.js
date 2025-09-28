import axios from "axios"

export const Axios = axios.create({
    baseURL: import.meta.env.MODE == "development" ? "http://localhost:5001" : "https://task-flow-aarm.onrender.com",
    withCredentials: true
})