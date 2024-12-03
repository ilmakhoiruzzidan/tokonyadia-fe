import {PencilSquareIcon, TrashIcon} from "@heroicons/react/24/outline/index.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {deleteCategoryAction, getAllCategoriesAction} from "../../../redux/actions/categoryAction.js";
import usePagination from "../../../shared/hooks/usePagination.jsx";
import {PlusIcon} from "@heroicons/react/16/solid/index.js";
import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid/index.js";
import useDialog from "../../../shared/hooks/useDialog.jsx";
import ModalFormCreateCategory from "./form/ModalFormCreateCategory.jsx";
import {setSelectedCategory} from "../../../redux/slices/categorySlices.js";
import Modal from "../../../shared/components/Modal.jsx";
import ModalFormUpdateCategory from "./form/ModalFormUpdateCategory.jsx";

function CategoryList() {
    const dispatch = useDispatch();
    const {page, size, handleChangePage} = usePagination();
    const {categories, selectedCategory, paging} = useSelector((state) => state.categories);

    const {ref: dialogRefCreate, handleOpen: handleOpenCreate, handleClose: handleCloseCreate} = useDialog();
    const {ref: dialogRefUpdate, handleOpen: handleOpenUpdate, handleClose: handleCloseUpdate} = useDialog();
    const {ref: dialogRefDelete, handleOpen: handleOpenDelete, handleClose: handleCloseDelete} = useDialog();

    const openFormCreateModal = () => {
        handleOpenCreate();
    }

    const openDeleteModal = (category) => {
        dispatch(setSelectedCategory(category));
        handleOpenDelete();
    }


    const handleDelete = async () => {
        await dispatch(deleteCategoryAction({
            id: selectedCategory.id,
            page: page,
            size: size,
            onSuccess: () => handleCloseDelete(),
        }));
    }

    const openFormUpdateModal = (category) => {
        handleOpenUpdate(() => {
            dispatch(setSelectedCategory(category));
        });
    }

    useEffect(() => {
        dispatch(getAllCategoriesAction({
            page: page,
            size: size,
        }))
    }, [page, size, dispatch]);
    return (
        <>
            <ModalFormCreateCategory
                ref={dialogRefCreate}
                title={"Add New Category"}
                hasConfirm
                onClose={handleCloseCreate}
                confirmBtnText={"Submit"}>
            </ModalFormCreateCategory>
            <ModalFormUpdateCategory
                ref={dialogRefUpdate}
                title={"Update Category"}
                hasConfirm
                onClose={handleCloseUpdate}
                confirmBtnText={"Update"}>
            </ModalFormUpdateCategory>
            <Modal
                ref={dialogRefDelete}
                title={"Delete Category"}
                hasConfirm
                onClose={handleCloseDelete}
                onConfirm={handleDelete}
                confirmBtnText={"Delete"}>
                <p>Are you sure?</p>
            </Modal>

            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Category Management</h1>
                <div className="flex gap-4">
                    <button
                        onClick={() => {
                            openFormCreateModal()
                        }}
                        className="bg-blue-800 text-white py-2 px-3 rounded-lg flex gap-4 items-center">
                        <PlusIcon className="size-5"/>
                        <span className="text-sm">Add Category</span>
                    </button>
                    <div className="flex gap-4 items-center">
                        <button
                            disabled={page <= 1}
                            onClick={() => handleChangePage(page - 1)}>
                            <ChevronLeftIcon className="size-5"/>
                        </button>
                        <button
                            disabled={categories.length < size}
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
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">ID</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">NAME</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">DESCRIPTION</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm"></th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    categories && categories.length === 0 ?
                        <tr>
                            <td className="px-4 py-2 font-bold bg-gray-50 text-center" colSpan={8}>
                                No Data
                            </td>
                        </tr> :
                        categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-4 py-2 border-b border-gray-300">{category.id}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{category.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{category.description}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => openFormUpdateModal(category)}>
                                                <PencilSquareIcon className="size-5 text-amber-600"/>
                                            </button>
                                            <button
                                                onClick={() => openDeleteModal(category)}>
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
    )
}

export default CategoryList;