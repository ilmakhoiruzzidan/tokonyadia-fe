import {lazy} from "react";

const ProductList = lazy(() => import('./components/ProductList'));
const ProductFormCreate = lazy(() => import('./components/forms/ProductFormCreate.jsx'));
const ProductFormUpdate = lazy(() => import('./components/forms/ProductFormUpdate.jsx'));

export {
    ProductList,
    ProductFormCreate,
    ProductFormUpdate,
}