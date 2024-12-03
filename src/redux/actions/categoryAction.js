import createActionWithMeta from "./createActionWithMeta.js";
import categoryService from "../../services/categoryService.js";
import toast from "react-hot-toast";


export const createCategoryAction = createActionWithMeta(
    'categories/createCategory',
    async ({page, size, values, onSuccess}, thunkAPI) => {
        try {
            const response = await categoryService.create(values);
            toast.success(response.message);
            thunkAPI.dispatch(getAllCategoriesAction({
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

export const getAllCategoriesAction = createActionWithMeta(
    'categories/getCategories',
    async (payload, thunkAPI) => {
        try {
            return await categoryService.getAllCategories(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {
        conditionKey : 'isFetching',
        metaType: 'fetching',
    },
);

export const deleteCategoryAction = createActionWithMeta(
    'categories/deleteCategory',
    async ({id, page, size, onSuccess}, thunkAPI) => {
        try {
            const response = await categoryService.deleteById(id);
            onSuccess();
            toast.success(response.message);
            thunkAPI.dispatch(getAllCategoriesAction({
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

export const updateCategoryAction = createActionWithMeta(
    'categories/updateCategory',
    async ({ page, size, values, onSuccess }, thunkAPI) => {
        try {
            const response = await categoryService.update(values);
            toast.success(response.message);
            thunkAPI.dispatch(getAllCategoriesAction({
                page: page,
                size: size,
            }));
            onSuccess();
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    { conditionKey: 'isSubmitting', metaType: 'submitting' }
);