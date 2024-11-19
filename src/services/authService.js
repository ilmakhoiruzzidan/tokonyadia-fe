import axios from "axios";
import httpClient from "../libs/api.js";

const authService = {
    async login(request) {
        const {data} = await axios.post('/api/auth/login', request);
        return data;
    },
    async logout() {
        const {data}= await httpClient.post('/api/auth/logout');
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