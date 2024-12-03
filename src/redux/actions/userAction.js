import createActionWithMeta from "./createActionWithMeta.js";
import userService from "../../services/userService.js";

export const getProfileAction = createActionWithMeta(
    'users/getMe',
    async (payload, thunkAPI) => {
        try {
            return await userService.getProfile(payload);
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    },
    {
        conditionKey : 'isFetching',
        metaType: 'fetching',
    },
)
