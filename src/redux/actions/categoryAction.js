import createActionWithMeta from "./createActionWithMeta.js";
import categoryService from "../../services/categoryService.js";


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
)