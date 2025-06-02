import axios from "axios";

export const apiInstance = axios.create({
    baseURL: 'https://easydev.club/api/v1/',
    headers: {
        "Content-Type": "application/json",
    }
})