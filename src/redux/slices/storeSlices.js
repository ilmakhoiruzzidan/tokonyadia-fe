import {createSlice} from "@reduxjs/toolkit";
import {getAllStoresAction, getStoreByIdAction} from "../actions/storeAction.js";

const storeSlices = createSlice({
    name: 'store',
    initialState: {
        stores: [],
        selectedStore: null,
        paging: {
            totalItems: 0,
            totalPages: 0,
            page: 1,
            size: 10,
        },
    },
    reducers: {
        setSelectedStore(state, {payload}) {
            state.selectedStore = payload;
        },
        clearSelectedStore(state) {
            state.selectedStore = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllStoresAction.fulfilled, (state, action) => {
            state.stores = action.payload.data || [];
            state.paging = action.payload.paging;
        });
        builder.addCase(getStoreByIdAction.fulfilled, (state, action) => {
            state.selectedStore = action.payload;
        })
    }
})


export const {
    setSelectedStore,
    clearSelectedStore
} = storeSlices.actions;
export default storeSlices.reducer;