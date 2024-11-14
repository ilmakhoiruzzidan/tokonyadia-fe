import {configureStore} from '@reduxjs/toolkit';
import hookReducer from './slices/hookSlices.js';

const store = configureStore({
    reducer: {
        products: hookReducer,
    }
})

export default store;