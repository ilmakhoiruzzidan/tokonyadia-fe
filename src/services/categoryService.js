import httpClient from "../libs/api.js";

const BASE_PRODUCT_CATEGORY_API = '/api/products/categories';
const categoryService = {

    async getAllCategories(query) {
        const {data} = await httpClient.get(BASE_PRODUCT_CATEGORY_API, {
            params: query,
        });
        return data;
    },

}

export default categoryService;