import {configureStore} from '@reduxjs/toolkit';

import uiReducer from "./slices/uiSlices.js";
import userReducer from "./slices/userSlices.js";
import storeReducer from "./slices/storeSlices.js";
import productReducer from './slices/productSlices.js';
import categoryReducer from "./slices/categorySlices.js";

const store = configureStore({
    reducer: {
        ui: uiReducer,
        users: userReducer,
        stores: storeReducer,
        products: productReducer,
        categories: categoryReducer,
    },

})

export default store;