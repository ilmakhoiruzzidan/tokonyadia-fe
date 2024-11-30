import {configureStore} from '@reduxjs/toolkit';

import uiReducer from "./slices/uiSlices.js";
import storeReducer from "./slices/storeSlices.js";
import productReducer from './slices/productSlices.js';
import categoryReducer from "./slices/categorySlices.js";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        stores: storeReducer,
        products: productReducer,
        categories: categoryReducer,
    },

})

export default store;