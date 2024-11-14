import {createSlice} from "@reduxjs/toolkit";

const hookSlice = createSlice({
    initialState: {
        products: [],
        selectedProduct: null,
    },
    name: 'product',
    reducers: {
        addProduct(state, {payload}) {
            state.products = [...state.products, payload];
        },
        deleteProductById(state, {payload}) {
            state.products = state.products.filter(item => item.id !== payload);
        },
        updateProduct(state, {payload}) {
            state.products = state.products.map(item => item.id === payload.id ? payload : item);
        },
        setSelectedProduct(state, {payload}) {
            state.selectedProduct = payload;
        },
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        }
    }
});

export const {
    addProduct,
    deleteProductById,
    updateProduct,
    setSelectedProduct,
    clearSelectedProduct
} = hookSlice.actions;
export default hookSlice.reducer;