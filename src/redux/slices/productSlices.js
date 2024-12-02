import {createSlice} from "@reduxjs/toolkit";
import {getAllProductsAction, getProductByIdAction} from "../actions/productAction.js";

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        selectedProduct: null,
        paging: {
            totalItems: 0,
            totalPages: 0,
            page: 1,
            size: 10,
        },
    },
    reducers: {
        setSelectedProduct(state, action) {
            state.selectedProduct = action.payload;
            if (action.payload.images && action.payload.images.length >= 0) {
                state.selectedImage = action.payload.images[0];
            }
        },
        clearSelectedProduct(state) {
            state.selectedProduct = null;
        },
        updateProductImages(state, action) {
            if (state.selectedProduct) {
                state.selectedProduct.images = action.payload;
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
            state.products = action.payload.data || [];
            state.paging = action.payload.paging;
        });
        builder.addCase(getProductByIdAction.fulfilled, (state, action) => {
            console.log('Data fetched from API:', action.payload);
            state.selectedProduct = action.payload;
        });
    }
});

export const {
    setSelectedProduct,
    clearSelectedProduct,
    updateProductImages
} = productSlice.actions;
export default productSlice.reducer;