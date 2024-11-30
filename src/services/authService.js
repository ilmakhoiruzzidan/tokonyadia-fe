import axios from "axios";
import httpClient from "../libs/api.js";


const authService = {
    async login(request) {
        const {data} = await httpClient.post('/api/auth/login', request);
        localStorage.setItem("accessToken", data.data.accessToken);
        return data;
    },
    async logout() {
        const accessToken = localStorage.getItem("accessToken");
        const {data} = await httpClient.post('/api/auth/logout', {}, {
            headers: {
                Authorization: `Bearer ${accessToken}`
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