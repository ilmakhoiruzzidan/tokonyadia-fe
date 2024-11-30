import {createSlice} from "@reduxjs/toolkit";
import {getAllProductsAction, getProductByIdAction} from "../actions/productAction.js";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        selectedProduct: null,
    },
    reducers: {
        setSelectedProduct(state, {payload}) {
            state.selectedProduct = payload;
        },
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
            state.products = action.payload.data || [];
        });
        builder.addCase(getProductByIdAction.fulfilled, (state, action) => {
            state.selectedProduct = action.payload;
        });
    }
});

export const {
    setSelectedProduct,
    clearSelectedProduct
} = productSlice.actions;
export default productSlice.reducer;