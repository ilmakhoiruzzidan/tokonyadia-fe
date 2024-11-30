import createActionWithMeta from "./createActionWithMeta.js";
import authService from "../../services/authService.js";
import toast from "react-hot-toast";

export const loginAction = createActionWithMeta(
    'auth/login',
    async (payload, thunkAPI) => {
        try {
            const response = await authService.login(payload);
            toast.success(response.message);
            return response;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {conditionKey: 'isSubmitting', metaType: 'submitting'}
);

export const logoutAction = createActionWithMeta(
    'auth/logout',
    async (payload, thunkAPI) => {
        try {
            await authService.logout();
            payload?.onSuccess();
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {conditionKey: 'isSubmitting', metaType: 'submitting'}
);