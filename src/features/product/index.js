import {lazy} from "react";

const ProductList = lazy(() => import('./components/ProductList'));

export {
    ProductList,
}