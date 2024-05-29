import axios from "axios";

const host = process.env.NEXT_PUBLIC_HOST_URL || 'http://localhost:3000'

export const axiosRegister = axios.create({
    baseURL: `${host}/api/`
})

export const axiosLogin = axios.create({
    baseURL: `${host}/api/`
})