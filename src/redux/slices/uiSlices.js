import {createSlice} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isFetching: false,
        isSubmitting: false,
        isLoading: false,
        error: null,
    },
    reducers: {
        loading: (state, action) => {
            const { type } = action.payload;
            if (type === 'fetching') state.isFetching = true;
            if (type === 'submitting') state.isSubmitting = true;
            state.isLoading = true;
        },
        success: (state) => {
            state.isFetching = false;
            state.isSubmitting = false;
            state.isLoading = false;
        },
        error: (state, action) => {
            const { errorMessage } = action.payload;
            state.isFetching = false;
            state.isSubmitting = false;
            state.isLoading = false;

            state.error = errorMessage || 'Unexpected error occurred';
            toast.error(state.error);
        },
    }
});

export const {
    loading,
    success,
    error,
} = uiSlice.actions;

export default uiSlice.reducer;