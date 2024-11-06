import React from 'react';
import { useSelector } from 'react-redux';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  selectExpensesByCategory,
  selectTotalBalance,
} from '../../redux/selectors/transactionsSelector';

ChartJS.register(ArcElement, Tooltip, Legend);

const Chart = () => {
  const expensesByCategory = useSelector(selectExpensesByCategory);
  const balance = useSelector(selectTotalBalance) || 0;

  const categories = [
    { label: 'Main expenses', color: '#fed057' },
    { label: 'Products', color: '#ffd8d0' },
    { label: 'Car', color: '#FFADAD' },
    { label: 'Self care', color: '#D0A8FF' },
    { label: 'Child care', color: '#8F9BFF' },
    { label: 'Household products', color: '#6E7FFF' },
    { label: 'Education', color: '#65E2FF' },
    { label: 'Leisure', color: '#47D5A4' },
    { label: 'Other expenses', color: '#28B491' },
  ];

  const labels = categories.map(category => category.label);
  const dataValues = categories.map(
    category => expensesByCategory[category.label] || 0
  );
  const backgroundColors = categories.map(category => category.color);

  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: backgroundColors,
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
        ₹
        {balance.toLocaleString('en-US', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </div>
    </div>
  );
};

export default Chart;
