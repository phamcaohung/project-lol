import axios from "axios"

export const API_BASE_URL = "http://localhost:8080"
// export const API_BASE_URL = "https://endurable-stone-production.up.railway.app"


const getJwt = () => localStorage.getItem("jwt")


export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const jwt = getJwt()
    if (jwt)
        config.headers["Authorization"] = `Bearer ${jwt}`
    return config
})