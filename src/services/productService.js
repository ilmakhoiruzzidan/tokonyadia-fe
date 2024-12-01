import httpClient from "../libs/api.js";

const BASE_PRODUCT_API = '/api/products';

const productService = {
    async create(request) {
        const formData = new FormData();
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error()
        }

        const product = {
            name: request.name,
            price: request.price,
            categoryId: request.category,
            description: request.description,
            stock: request.stock,
            storeId: request.store,
        }

        formData.append('product', JSON.stringify(product));

        const images = request.images;
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }

        const {data} = await httpClient.post(BASE_PRODUCT_API, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return data;
    },
    async getAll(query) {
        const {data} = await httpClient.get(BASE_PRODUCT_API, {
            params: query,
        });
        return data;
    },
    async getById(id) {
        const {data} = await httpClient.get(`${BASE_PRODUCT_API}/${id}`);
        return data;
    },
    async deleteById(id) {
        const {data} = await httpClient.delete(`${BASE_PRODUCT_API}/${id}`);
        return data;
    },
    async deleteSpecifiedImage(id) {
        const {data} = await httpClient.delete(`${BASE_PRODUCT_API}/images/${id}`);
        return data;
    },
    async update(request) {
        const formData = new FormData();
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
            throw new Error()
        }

        const productRequest = {
            name: request.name,
            price: request.price,
            categoryId: request.category,
            description: request.description,
            stock: request.stock,
            storeId: request.store,
        }

        formData.append('product', JSON.stringify(productRequest));

        const images = request.images;
        if (images && images.length > 0) {
            for (let i = 0; i < images.length; i++) {
                if (images[i]) {
                    formData.append('images', images[i]);
                }
            }
        } else {
            formData.append('images', '[]');
        }

        const {data} = await httpClient.put(`${BASE_PRODUCT_API}/${request.id}`, formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        });

        return data;
    }

}

export default productService;