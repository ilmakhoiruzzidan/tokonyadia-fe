import {createSlice} from "@reduxjs/toolkit";
import {getAllOrdersAction, getOrderByIdAction} from "../actions/orderAction.js";

const orderSlices = createSlice({
    name: 'order',
    initialState: {
        orders: [],
        selectedOrder: null,
        paging: {
            totalItems: 0,
            totalPages: 0,
            page: 1,
            size: 10,
        },
    },
    reducers: {
        setSelectedOrder(state, {payload}) {
            state.selectedOrder = payload;
        },
        clearSelectedOrder(state) {
            state.selectedOrder = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOrdersAction.fulfilled, (state, action) => {
            state.orders = action.payload.data || [];
            state.paging = action.payload.paging;
        });
        builder.addCase(getOrderByIdAction.fulfilled, (state, action) => {
            state.selectedOrder = action.payload;
        })
    }
})


export const {
    setSelectedOrder,
    clearSelectedOrder
} = orderSlices.actions;
export default orderSlices.reducer;