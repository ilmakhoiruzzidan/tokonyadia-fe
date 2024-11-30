import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllProductsAction} from "../../../redux/actions/productAction.js";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid/index.js";
import {parseRupiah} from "../../../shared/utils/currencyUtil.js";
import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";
import useDialog from "../../../shared/hooks/useDialog.jsx";
import ModalForm from "./forms/ModalForm.jsx";
import {getAllCategoriesAction} from "../../../redux/actions/categoryAction.js";
import {getAllStoresAction} from "../../../redux/actions/storeAction.js";

function ProductList() {
    const dispatch = useDispatch();
    const {products} = useSelector((state) => state.products);
    const {isFetching} = useSelector((state) => (state.ui));

    const {ref: dialogAddRef, handleOpen, handleClose} = useDialog();

    const openProductModal = () => {
        handleOpen(() => {
            // Fetch categories only when opening this modal
            dispatch(getAllCategoriesAction());
            dispatch(getAllStoresAction());
        });
    };

    useEffect(() => {
        dispatch(getAllProductsAction())
    }, [dispatch]);

    if (isFetching) {
        return "Loading...";
    }

    return (
        <>
            <ModalForm
                ref={dialogAddRef}
                title={"Add New Product"}
                hasConfirm

                onClose={handleClose}
                confirmBtnText={"Submit"}>
            </ModalForm>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            openProductModal()
                        }}
                        className="bg-blue-800 text-white py-2 px-3 rounded-lg flex gap-4 items-center">

                        <PlusIcon className="size-5"/>
                        <span className="text-sm">Add Product</span>
                    </button>
                    <div className="flex gap-4 items-center">
                        <button>
                            <ChevronLeftIcon className="size-5"/>
                        </button>
                        <button>
                            <ChevronRightIcon className="size-5"/>
                        </button>
                        <p className="text-sm text-gray-600">Show {products.length} of {products.length}</p>
                    </div>
                </div>

            </div>

            <table className="mt-4 min-w-full border border-gray-300 rounded-lg overflow-hidden">
                <thead className="bg-gray-100">
                <tr>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">#</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">NAME</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">STOCK</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">CATEGORY</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">STORE</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">PRICE</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">DESCRIPTION</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm"></th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    products && products.length === 0 ?
                        <tr>
                            <td className="px-4 py-2 font-bold bg-gray-50 text-center" colSpan={6}>
                                No Data
                            </td>
                        </tr> :
                        products.map((product, index) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-2 border-b border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.stock}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.category.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.store.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{parseRupiah(product.price)}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.description}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <div className="flex gap-4">
                                            <PencilSquareIcon className="size-5 text-amber-600"/>
                                            <button>
                                                <TrashIcon className="size-5 text-red-500"/>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                        )
                }
                </tbody>
            </table>

        </>
    );
}

export default ProductList;