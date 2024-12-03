import {ChevronLeftIcon, ChevronRightIcon} from "@heroicons/react/24/solid/index.js";
import {useDispatch, useSelector} from "react-redux";
import usePagination from "../../../shared/hooks/usePagination.jsx";
import {useEffect} from "react";
import {getAllOrdersAction} from "../../../redux/actions/orderAction.js";
import useDialog from "../../../shared/hooks/useDialog.jsx";
import Modal from "../../../shared/components/Modal.jsx";
import {setSelectedOrder} from "../../../redux/slices/orderSlices.js";

function OrderList() {
    const dispatch = useDispatch();
    const {page, size, handleChangePage} = usePagination();
    const {ref: dialogRef, handleOpen, handleClose} = useDialog();

    const {orders, selectedOrder, paging} = useSelector((state) => state.orders);

    const getTransactionStatus = (transactionStatus) => {
        const statusClasses = {
            DRAFT: 'bg-blue-400 text-white',
            FAILED: 'bg-red-400 text-white',
            EXPIRE: 'bg-red-400 text-white',
            CONFIRMED: 'bg-teal-400 text-white',
            PENDING: 'bg-yellow-400 text-white',
        };
        return statusClasses[transactionStatus] || 'bg-gray-300 text-black';
    };

    const openModalOrderDetail = (order) => {
        dispatch(setSelectedOrder(order));
        handleOpen();
    }

    useEffect(() => {
        dispatch(getAllOrdersAction({
            page: page,
            size: size,
        }))
    }, [page, size, dispatch]);


    console.log(selectedOrder)
    return (
        <>
            <Modal
                ref={dialogRef}
                title={"Detail Order"}
                onClose={handleClose}
            >
                <div>
                    <div className="my-4 space-y-4">
                        {selectedOrder?.orderDetail?.map((detail) => (
                            <div
                                key={detail.id}
                                className="border border-gray-300 rounded-lg p-4 shadow-sm"
                            >
                                <h3 className="text-lg font-semibold">{detail.product.productName}</h3>
                                <p className="text-sm text-gray-600">
                                    <strong>Category:</strong> {detail.product.categoryName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Store:</strong> {detail.product.storeName}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Price:</strong> Rp {detail.price.toLocaleString()}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Quantity:</strong> {detail.qty}
                                </p>
                                <p className="text-sm text-gray-600">
                                    <strong>Stock Available:</strong> {detail.product.stock}
                                </p>
                            </div>
                        )) || (
                            <p className="text-gray-600">No order details available.</p>
                        )}
                    </div>
                </div>
            </Modal>
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold mb-4">Order List</h1>
                <div className="flex gap-4">
                    <div className="flex gap-4 items-center">
                        <button
                            disabled={page <= 1}
                            onClick={() => handleChangePage(page - 1)}>
                            <ChevronLeftIcon className="size-5"/>
                        </button>
                        <button
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
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">DATE</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">CUSTOMER</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">DETAILS</th>
                    <th className="px-4 py-2 text-left text-gray-500 text-sm">STATUS</th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {
                    orders && orders.length === 0 ?
                        <tr>
                            <td className="px-4 py-2 font-bold bg-gray-50 text-center" colSpan={5}>
                                No Data
                            </td>
                        </tr> :
                        orders.map((order) => (
                                <tr key={order.orderId}>
                                    <td className="px-4 py-2 border-b border-gray-300">{order.orderId}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{order.transactionDate}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">{order.customer?.name || 'Unknown'}</td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <button onClick={() => openModalOrderDetail(order)}>
                                            <p className='underline'>See Details</p>
                                        </button>
                                    </td>
                                    <td className="px-4 py-2 border-b border-gray-300">
                                        <span
                                            className={`px-2 py-1 text-sm rounded-xl ${getTransactionStatus(order.transactionStatus)}`}>
                                        {order.transactionStatus}
                                        </span>
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

export default OrderList;