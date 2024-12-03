import createActionWithMeta from "./createActionWithMeta.js";
import orderService from "../../services/orderService.js";

export const getAllOrdersAction = createActionWithMeta(
    'orders/getOrders',
    async (payload, thunkAPI) => {
        try {
            return await orderService.getAll(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {
        conditionKey : 'isFetching',
        metaType: 'fetching',
    },
)

export const getOrderByIdAction = createActionWithMeta(
    'orders/getOrderById',
    async ({id, onSuccess, onFailed}, thunkAPI) => {
        try {
            const response = await orderService.getById(id);
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
