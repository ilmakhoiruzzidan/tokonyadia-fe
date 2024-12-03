import { Line } from "react-chartjs-2";
import PropTypes from "prop-types";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


RevenueChart.propTypes = {
    revenuePerMonth: PropTypes.object.isRequired,
}

function RevenueChart({ revenuePerMonth }) {
    if (!Object.keys(revenuePerMonth).length) {
        return <p>No data available</p>;
    }
    const data = {
        labels: Object.keys(revenuePerMonth),
        datasets: [
            {
                label: 'Revenue',
                data: Object.values(revenuePerMonth),
                fill: false,
                backgroundColor: 'rgb(75, 192, 192)',
                borderColor: 'rgba(75, 192, 192, 0.2)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: { display: true, text: 'Monthly Revenue' },
        },
        scales: {
            x: {
                type: 'category',
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
}

export default RevenueChart;
