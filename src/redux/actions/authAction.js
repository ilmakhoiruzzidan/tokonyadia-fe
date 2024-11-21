import createActionWithMeta from "./createActionWithMeta.js";
import authService from "../../services/authService.js";

export const refreshTokenAction = createActionWithMeta(
    'auth/refresh-token',
    async (_, thunkAPI) => {
        try {
            const response = await authService.refreshToken();
            return response.data;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {conditionKey: 'isFetching', metaType: 'fetching'}
);
