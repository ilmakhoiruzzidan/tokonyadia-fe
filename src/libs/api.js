import axios from "axios";

const httpClient = axios.create({
    withCredentials: true,
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
    }
});

export default httpClient;