import httpClient from "../libs/api.js";

const BASE_ORDER_API = '/api/orders';
const storeService = {
    async getAll(query) {
        const {data} = await httpClient.get(BASE_ORDER_API, {
            params: query,
        });
        return data;
    },
    async getById(id) {
        const {data} = await httpClient.get(`${BASE_ORDER_API}/${id}`);
        return data;
    },
}



export default storeService;