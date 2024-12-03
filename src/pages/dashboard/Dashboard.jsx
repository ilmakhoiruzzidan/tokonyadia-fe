import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getAllOrdersAction} from "../../redux/actions/orderAction.js";
import OrderStatusChart from "../../shared/components/OrderStatusChart.jsx";
import RevenueChart from "../../shared/components/RevenueChart.jsx";

function Dashboard() {

    const dispatch = useDispatch();
    const {orders} = useSelector((state) => state.orders);

    const statusCounts = orders?.reduce((acc, order) => {
        acc[order.transactionStatus] = (acc[order.transactionStatus] || 0) + 1;
        return acc;
    }, {});

    const revenuePerMonth = orders?.reduce((acc, order) => {
        const month = new Date(order.transactionDate).toLocaleString("default", { month: "long" });
        const revenue = order.orderDetail.reduce((sum, item) => sum + item.price * item.qty, 0);
        acc[month] = (acc[month] || 0) + revenue;
        return acc;
    }, {}) || {};


    useEffect(() => {
        dispatch(getAllOrdersAction())
    }, [dispatch]);
    return (
        <>
            <div className='p-4'>
                <h1 className='text-2xl font-bold mb-4'>Dashboard</h1>
                <div className='flex gap-4'>
                    Chart 1
                    <OrderStatusChart statusCounts={statusCounts} />
                </div>
                <div>
                    <RevenueChart revenuePerMonth={revenuePerMonth} />
                    Chart 2
                </div>
            </div>
        </>
    )
}

export default Dashboard;
