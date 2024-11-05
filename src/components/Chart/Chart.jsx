import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const data = {
    labels: [
      'Car',
      'Self care',
      'Child care',
      'Household products',
      'Education',
      'Leisure',
      'Other expenses'
    ],
    datasets: [
      {
        data: [1500, 800, 2208.5, 300, 3400, 1230, 610],
        backgroundColor: [
          '#FCB69F',
          '#FAD02E',
          '#00A36C',
          '#FF7676',
          '#2F8FED',
          '#A084E8',
          '#43AA8B',
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: '80%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div style={{ position: 'relative', width: '300px', height: '300px' }}>
      <Doughnut data={data} options={options} />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#fff',
        }}
      >
        ₹24,000.00
      </div>
    </div>
  );
};

export default Chart;
