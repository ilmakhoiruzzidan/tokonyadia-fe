import createActionWithMeta from "./createActionWithMeta.js";
import storeService from "../../services/storeService.js";

export const getAllStoresAction = createActionWithMeta(
    'stores/getStores',
    async (payload, thunkAPI) => {
        try {
            return await storeService.getAll(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {
        conditionKey : 'isFetching',
        metaType: 'fetching',
    },
)

export const getStoreByIdAction = createActionWithMeta(
    'stores/getStoreById',
    async ({id, onSuccess, onFailed}, thunkAPI) => {
        try {
            const response = await storeService.getById(id);
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
