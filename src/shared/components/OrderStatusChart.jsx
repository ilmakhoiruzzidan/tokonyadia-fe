import {Pie} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
    PieController,
} from 'chart.js';
import PropTypes from "prop-types";

ChartJS.register(
    CategoryScale,
    ArcElement, Tooltip, Legend, Title, PieController
);

OrderStatusChart.propTypes = {
    statusCounts: PropTypes.any.isRequired,
}

function OrderStatusChart({ statusCounts }) {
    const data = {
        labels: Object.keys(statusCounts),
        datasets: [
            {
                label: 'Number of Orders',
                data: Object.values(statusCounts),
                backgroundColor: [
                    'rgba(69,192,232,0.6)',
                    'rgba(76,230,76,0.6)',
                    'rgba(221,81,103,0.7)',
                ],
                borderColor: [
                    'rgba(173, 216, 230, 1)',
                    'rgba(144, 238, 144, 1)',
                    'rgba(255, 182, 193, 1)',
                ],

                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Orders by Status' },
        },
    };

    return <Pie data={data} options={options} />;
}

export default OrderStatusChart;
