import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid/index.js";
import {useDispatch, useSelector} from "react-redux";
import usePagination from "../../../shared/hooks/usePagination.jsx";
import {useEffect} from "react";
import {getAllStoresAction} from "../../../redux/actions/storeAction.js";

function StoreList() {
    const dispatch = useDispatch();
    const {page, size, handleChangePage} = usePagination();
    const {stores, paging} = useSelector((state) => state.stores);

    useEffect(() => {
        dispatch(getAllStoresAction({
            page: page,
            size: size,
        }))
    }, [page, size, dispatch]);

    return (
        <>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Store List</h1>
                <div className="flex gap-4">
                    <div className="flex gap-4 items-center">
                        <button
                            disabled={page <= 1}
                            onClick={() => handleChangePage(page - 1)}>
                            <ChevronLeftIcon className="size-5"/>
                        </button>
                        <button
                            disabled={stores.length < size}
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
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">NO SIUP</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">NAME</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">ADDRESS</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">PHONE NUMBER</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    stores && stores.length === 0 ?
                        <tr>
                            <td className="px-4 py-2 font-bold bg-gray-50 text-center" colSpan={5}>
                                No Data
                            </td>
                        </tr> :
                        stores.map((store) => (
                                <tr key={store.id}>
                                    <td className="px-4 py-2 border-b border-gray-300">{store.id}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{store.noSiup}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{store.name}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{store.address}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{store.phoneNumber}</td>
                                </tr>
                            )
                        )
                }
                </tbody>
            </table>
        </>
    )
}

export default StoreList;