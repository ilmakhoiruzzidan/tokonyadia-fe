import {createSlice} from "@reduxjs/toolkit";
import {getProfileAction} from "../actions/userAction.js";

const userSlices = createSlice({
    name: 'user',
    initialState: {
        user: null,
        selectedUser: null,
    },
    reducers: {
        setSelectedUser(state, {payload}) {
            state.selectedUser = payload;
        },
        clearSelectedUser(state) {
            state.selectedUser = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProfileAction.fulfilled, (state, action) => {
            state.user = action.payload.data || [];
        });
    }
})


export const {
    setSelectedUser,
    clearSelectedUser
} = userSlices.actions;
export default userSlices.reducer;