import {configureStore} from '@reduxjs/toolkit';
import hookReducer from './slices/hookSlices.js';
import uiReducer from "./slices/uiSlices.js";

const store = configureStore({
    reducer: {
        products: hookReducer,
        ui: uiReducer,
    }
})

export default store;