import httpClient from "../libs/api.js";

const BASE_PRODUCT_CATEGORY_API = '/api/products/categories';
const categoryService = {
    async create(request) {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error();
        }

        const category = {
            name: request.name,
            description: request.description,
        }

        const {data} = await httpClient.post(BASE_PRODUCT_CATEGORY_API, category, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return data;
    },
    async getAllCategories(query) {
        const {data} = await httpClient.get(BASE_PRODUCT_CATEGORY_API, {
            params: query,
        });
        return data;
    },
    async deleteById(id) {
        const {data} = await httpClient.delete(`${BASE_PRODUCT_CATEGORY_API}/${id}`);
        return data;
    },
    async update(request) {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error();
        }

        const category = {
            name: request.name,
            description: request.description,
        }

        const {data} = await httpClient.put(`${BASE_PRODUCT_CATEGORY_API}/${request.id}`, category, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        console.log(data)
        return data;
    },
}

export default categoryService;