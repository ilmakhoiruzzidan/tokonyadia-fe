import axios from "axios";
import httpClient from "../libs/api.js";


const authService = {
    async login(request) {
        const {data} = await httpClient.post('/api/auth/login', request);
        localStorage.setItem("accessToken", data.data.accessToken);
        return data;
    },
    async logout() {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            throw new Error("Token not found");
        }
        const {data} = await httpClient.post('/api/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    },
    async refreshToken() {
        const {data} = await axios.post('/api/auth/refresh-token', {}, {
            withCredentials: true
        });
        return data;
    }
}

export default authService