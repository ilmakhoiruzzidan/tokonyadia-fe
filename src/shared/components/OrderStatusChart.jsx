import {Bar} from "react-chartjs-2";
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    BarElement,
} from 'chart.js';
import PropTypes from "prop-types";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
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
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 205, 86, 1)',
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

    return <Bar data={data} options={options} />;
}

export default OrderStatusChart;
