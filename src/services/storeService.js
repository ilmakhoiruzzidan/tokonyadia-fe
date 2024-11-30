import httpClient from "../libs/api.js";

const BASE_STORE_API = '/api/stores';
const storeService = {
    async getAll(query) {
        const {data} = await httpClient.get(BASE_STORE_API, {
            params: query,
        });
        return data;
    },
    async getById(id) {
        const {data} = await httpClient.get(`${BASE_STORE_API}/${id}`);
        return data;
    },
}



export default storeService;