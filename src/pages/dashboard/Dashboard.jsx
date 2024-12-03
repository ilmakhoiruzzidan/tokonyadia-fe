import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllOrdersAction} from "../../redux/actions/orderAction.js";
import OrderStatusChart from "../../shared/components/OrderStatusChart.jsx";
import RevenueChart from "../../shared/components/RevenueChart.jsx";

function Dashboard() {

    const dispatch = useDispatch();
    const {orders} = useSelector((state) => state.orders);

    const statusCounts = orders?.reduce((acc, order) => {
        if (!acc[order.transactionStatus]) {
            acc[order.transactionStatus] = 0;
        }
        acc[order.transactionStatus] += 1;
        return acc;
    }, {});

    if (!statusCounts['EXPIRE']) {
        statusCounts['EXPIRE'] = 0;
    }


    const revenuePerDay = orders?.reduce((acc, order) => {
        const transactionDate = new Date(order.transactionDate);

        if (isNaN(transactionDate)) {
            console.warn(`Tanggal tidak valid untuk order ID: ${order.id}`);
            return acc;
        }

        const date = transactionDate.toLocaleDateString(); // Mengambil tanggal tanpa bulan atau tahun

        if (!Array.isArray(order.orderDetail)) {
            console.warn(`Detail pesanan kosong untuk order ID: ${order.id}`);
            return acc;
        }

        const revenue = order.orderDetail.reduce((sum, item) => {
            const price = item.price || 0;
            const qty = item.qty || 0;
            return sum + (price * qty);
        }, 0);

        acc[date] = (acc[date] || 0) + revenue; // Menggunakan tanggal sebagai key
        return acc;
    }, {}) || {};


    useEffect(() => {
        dispatch(getAllOrdersAction({
            size: 100,
        }))
    }, [dispatch]);
    return (
        <>
            <div className='p-4'>
                <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
                <div className='grid grid-cols-2 gap-4'>
                    <div className='p-4 bg-white rounded shadow'>
                        <OrderStatusChart statusCounts={statusCounts}/>
                    </div>
                    <div className='p-4 bg-white rounded shadow'>
                        <RevenueChart revenuePerDay={revenuePerDay}/>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Dashboard;
