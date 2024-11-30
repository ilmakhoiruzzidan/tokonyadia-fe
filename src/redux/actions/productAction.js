import createActionWithMeta from "./createActionWithMeta.js";
import productService from "../../services/productService.js";
import toast from "react-hot-toast";


export const createProductAction = createActionWithMeta(
    'products/createProduct',
    async ({ values, onSuccess }, thunkAPI) => {
        try {
            const response = await productService.create(values);
            toast.success(response.message);
            onSuccess();
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    { conditionKey: 'isSubmitting', metaType: 'submitting' }
);

export const getAllProductsAction = createActionWithMeta(
    'products/getProducts',
async (payload, thunkAPI) => {
    try {
            return await productService.getAll(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {
        conditionKey : 'isFetching',
        metaType: 'fetching',
    },
);

export const getProductByIdAction = createActionWithMeta(
    'products/getProductById',
    async ({id, onSuccess, onFailed}, thunkAPI) => {
        try {
            const response = await productService.getById(id);
            onSuccess?.(response.data);
            return response.data;
        } catch (e) {
            onFailed();
            return thunkAPI.rejectWithValue(e);
        }
    },
    {
        conditionKey : 'isFetching',
        metaType: 'fetching',
    },
);

