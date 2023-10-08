import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = ({ data }) => {
  const chartData = {
    labels: data.map((item) => item.label), // Replace 'label' with the actual key in your data
    datasets: [
      {
        label: 'Data',
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(75,192,192,0.4)',
        hoverBorderColor: 'rgba(75,192,192,1)',
        data: data.map((item) => item.value), // Replace 'value' with the actual key in your data
      },
    ],
  };

  return (
    <div className="bar-chart">
      <Bar
        data={chartData}
        options={{
          responsive: true,
          scales: {
            x: {
              beginAtZero: true,
            },
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
