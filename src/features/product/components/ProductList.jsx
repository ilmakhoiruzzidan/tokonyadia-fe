import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {
    deleteProductAction,
    deleteSpecifiedImageAction,
    getAllProductsAction
} from "../../../redux/actions/productAction.js";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid/index.js";
import {parseRupiah} from "../../../shared/utils/currencyUtil.js";
import {EyeIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";
import useDialog from "../../../shared/hooks/useDialog.jsx";
import ModalFormCreate from "./forms/ModalFormCreate.jsx";
import {getAllCategoriesAction} from "../../../redux/actions/categoryAction.js";
import {getAllStoresAction} from "../../../redux/actions/storeAction.js";
import usePagination from "../../../shared/hooks/usePagination.jsx";
import Modal from "../../../shared/components/Modal.jsx";
import {setSelectedProduct} from "../../../redux/slices/productSlices.js";
import ModalFormUpdate from "./forms/ModalFormUpdate.jsx";

function ProductList() {
    const dispatch = useDispatch();
    const {page, size, handleChangePage} = usePagination();
    const {isFetching} = useSelector((state) => (state.ui));
    const {products, selectedProduct, paging} = useSelector((state) => state.products);

    const {ref: dialogAddRef, handleOpen: handleOpenAdd, handleClose: handleCloseAdd} = useDialog();
    const {ref: dialogDeleteRef, handleOpen: handleOpenDelete, handleClose: handleCloseDelete} = useDialog();
    const {ref: dialogUpdateRef, handleOpen: handleOpenUpdate, handleClose: handleCloseUpdate} = useDialog();
    const {ref: dialogImageRef, handleOpen: handleOpenImage, handleClose: handleCloseImage} = useDialog();

    const openFormCreateModal = () => {
        handleOpenAdd(() => {
            // Fetch categories only when opening this modal
            dispatch(getAllCategoriesAction());
            dispatch(getAllStoresAction());
        });
    };

    const formatProductData = (product) => {
        return {
            ...product,
            price: product.price ? String(product.price) : "",
            stock: product.stock ? String(product.stock) : "",
        };
    };

    const openFormUpdateModal = (product) => {
        handleOpenUpdate(() => {
            // Fetch categories only when opening this modal
            dispatch(getAllCategoriesAction());
            dispatch(getAllStoresAction());
            dispatch(setSelectedProduct(formatProductData(product)));
        });
    };

    const openDeleteModal = (product) => {
        dispatch(setSelectedProduct(product));
        handleOpenDelete();
    }

    const handleDelete = async () => {
        try {
            const imageDeletionPromises = selectedProduct.images.map((image) =>
                dispatch(deleteSpecifiedImageAction({imageId: image.id}))
            );

            await Promise.all(imageDeletionPromises);

            await dispatch(deleteProductAction({
                id: selectedProduct.id,
                page: page,
                size: size,
                onSuccess: () => handleCloseDelete(),
            }));
        } catch (error) {
            console.error("Error deleting product or images:", error);
        }
    }

    const openImageModal = (product) => {
        dispatch(setSelectedProduct(product));
        handleOpenImage();
    }

    const getCategoryClass = (categoryName) => {
        switch (categoryName) {
            case 'Makanan':
                return 'bg-yellow-400 text-white';
            case 'Minuman':
                return 'bg-blue-400 text-white';
            default:
                return 'bg-gray-300 text-black';
        }
    };

    useEffect(() => {
        dispatch(getAllProductsAction({
            page: page,
            size: size,
        }))
    }, [dispatch, page, size]);

    if (isFetching) {
        return "Loading...";
    }

    return (
        <>
            <ModalFormCreate
                ref={dialogAddRef}
                title={"Add New Product"}
                hasConfirm
                onClose={handleCloseAdd}
                confirmBtnText={"Submit"}>
            </ModalFormCreate>
            <ModalFormUpdate
                ref={dialogUpdateRef}
                title={"Update Product"}
                hasConfirm
                onClose={handleCloseUpdate}
                confirmBtnText={"Update"}>
            </ModalFormUpdate>
            <Modal
                ref={dialogDeleteRef}
                title={"Delete Product"}
                hasConfirm
                confirmBtnText={"Delete"}
                onClose={handleCloseDelete}
                onConfirm={handleDelete}>
                <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            </Modal>
            <Modal
                ref={dialogImageRef}
                title={`Image ${selectedProduct?.name}`}
                onClose={handleCloseImage}>
                {
                    selectedProduct?.images && selectedProduct.images.length > 0 ? (
                        <div className="grid my-8 grid-cols-2 sm:grid-cols-3 gap-4">
                            {selectedProduct.images.map((image, index) => (
                                <div key={index} className="relative">
                                    <img
                                        src={image.url}
                                        alt={`Product Image ${index + 1}`}
                                        className="rounded-md w-full h-auto object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="flex justify-center items-center font-bold my-8">
                            No Image Shown
                        </p>
                    )
                }
            </Modal>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Product Management</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            openFormCreateModal()
                        }}
                        className="bg-blue-800 text-white py-2 px-3 rounded-lg flex gap-4 items-center">

                        <PlusIcon className="size-5"/>
                        <span className="text-sm">Add Product</span>
                    </button>
                    <div className="flex gap-4 items-center">
                        <button
                            disabled={page <= 1}
                            onClick={() => handleChangePage(page - 1)}>
                            <ChevronLeftIcon className="size-5"/>
                        </button>
                        <button
                            disabled={products.length < size}
                            onClick={() => handleChangePage(page + 1)}>
                            <ChevronRightIcon className="size-5"/>
                        </button>
                        <p className="text-sm text-gray-600">Showing {(paging.page - 1) * paging.size + 1} to{" "}
                            {Math.min(paging.page * paging.size, paging.totalItems)} of {paging.totalItems} results</p>
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
                            <td className="px-4 py-2 font-bold bg-gray-50 text-center" colSpan={8}>
                                No Data
                            </td>
                        </tr> :
                        products.map((product, index) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-2 border-b border-gray-300">{index + 1}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.stock}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                         <span
                                             className={`px-2 py-1 text-sm rounded-xl ${getCategoryClass(product.category.name)}`}>
                                        {product.category.name}
                                        </span>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.store.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{parseRupiah(product.price)}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{product.description}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <div className="flex gap-4">
                                            <button onClick={() => openImageModal(product)}>
                                                <div className="flex items-center justify-center">
                                                    <EyeIcon className="size-5 text-green-400"/>
                                                </div>
                                            </button>
                                            <button onClick={() => openFormUpdateModal(product)}>
                                                <PencilSquareIcon className="size-5 text-amber-600"/>
                                            </button>
                                            <button onClick={() => openDeleteModal(product)}>
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