import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './PieChart.css'; // Import the CSS file

// Register required components
ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ treatments }) => {
    // Define a set of colors for the pie chart segments
    const colors = [
        'rgba(255, 99, 132, 0.2)', // Red
        'rgba(54, 162, 235, 0.2)', // Blue
        'rgba(255, 206, 86, 0.2)', // Yellow
        'rgba(75, 192, 192, 0.2)', // Green
        'rgba(153, 102, 255, 0.2)', // Purple
        'rgba(255, 159, 64, 0.2)', // Orange
    ];

    // Prepare data for the pie chart
    const data = {
        labels: treatments.map(treatment => treatment.name),
        datasets: [
            {
                data: treatments.map(treatment => treatment.duration),
                backgroundColor: colors.slice(0, treatments.length), // Ensure colors match number of treatments
                borderColor: colors.slice(0, treatments.length).map(color => color.replace('0.2', '1')), // Slightly darker borders
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="pie-chart-container">
            <h2>Duration Distribution</h2>
            <div className="chart">
                <Pie data={data} />
            </div>
        </div>
    );
};

export default PieChart;
