import {createSlice} from "@reduxjs/toolkit";
import {getProductByIdAction} from "../actions/productAction.js";
import {getAllCategoriesAction} from "../actions/categoryAction.js";

const categorySlices = createSlice({
    name: 'category',
    initialState: {
        categories: [],
        selectedCategory: null,
        paging: {
            totalItems: 0,
            totalPages: 0,
            page: 1,
            size: 10,
        },
    },
    reducers: {
        setSelectedCategory(state, {payload}) {
            state.selectedCategory = payload;
        },
        clearSelectedProduct(state) {
            state.selectedCategory = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllCategoriesAction.fulfilled, (state, action) => {
            state.categories = action.payload.data || [];
            state.paging = action.payload.paging;
        });
        builder.addCase(getProductByIdAction.fulfilled, (state, action) => {
            state.selectedCategory = action.payload;
        })
    }
})


export const {
    setSelectedCategory,
    clearSelectedCategory
} = categorySlices.actions;
export default categorySlices.reducer;