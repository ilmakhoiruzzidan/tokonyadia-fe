import createActionWithMeta from "./createActionWithMeta.js";
import productService from "../../services/productService.js";
import toast from "react-hot-toast";


export const createProductAction = createActionWithMeta(
    'products/createProduct',
    async ({page, size, values, onSuccess}, thunkAPI) => {
        try {
            const response = await productService.create(values);
            toast.success(response.message);
            thunkAPI.dispatch(getAllProductsAction({
                page: page,
                size: size,
            }));
            onSuccess();
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {conditionKey: 'isSubmitting', metaType: 'submitting'}
);

export const getAllProductsAction = createActionWithMeta(
    'products/getProducts',
    async ({page, size}, thunkAPI) => {
        try {
            return await productService.getAll({
                page: page,
                size: size,
            });
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {
        conditionKey: 'isFetching',
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
        conditionKey: 'isFetching',
        metaType: 'fetching',
    },
);

export const deleteProductAction = createActionWithMeta(
    'products/deleteProduct',
    async ({id, page, size, onSuccess}, thunkAPI) => {
        try {
            const response = await productService.deleteById(id);
            onSuccess();
            toast.success(response.message);
            thunkAPI.dispatch(getAllProductsAction({
                page: page,
                size: size,
            }));
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {conditionKey: 'isSubmitting', metaType: 'submitting'}
);

export const deleteSpecifiedImageAction = createActionWithMeta(
    'products/deleteProduct',
    async ({ imageId, onSuccess }, thunkAPI) => {
        try {
            const response = await productService.deleteSpecifiedImage(imageId);
            onSuccess?.();
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    { conditionKey: 'isSubmitting', metaType: 'submitting' }
);

export const updateProductAction = createActionWithMeta(
    'products/updateProduct',
    async ({ values, onSuccess }, thunkAPI) => {
        try {
            const response = await productService.update(values);
            toast.success(response.message);
            thunkAPI.dispatch(getAllProductsAction());
            onSuccess();
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    { conditionKey: 'isSubmitting', metaType: 'submitting' }
);