import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectTransactionsByCategory } from '../../redux/selectors/transactionsSelector';
import styles from './StatisticsTable.module.css';

const StatisticsTable = () => {
  const transactionsByCategory = useSelector(selectTransactionsByCategory);

  useEffect(() => {
    console.log('Sume pe categorii:', transactionsByCategory);
  }, [transactionsByCategory]);

  const expenses = [
    {
      label: 'Main expenses',
      amount: transactionsByCategory['Main expenses'] || 0,
      color: '#fed057',
    },
    {
      label: 'Products',
      amount: transactionsByCategory['Products'] || 0,
      color: '#ffd8d0',
    },
    {
      label: 'Car',
      amount: transactionsByCategory['Car'] || 0,
      color: '#FFADAD',
    },
    {
      label: 'Self care',
      amount: transactionsByCategory['Self care'] || 0,
      color: '#D0A8FF',
    },
    {
      label: 'Child care',
      amount: transactionsByCategory['Child care'] || 0,
      color: '#8F9BFF',
    },
    {
      label: 'Household products',
      amount: transactionsByCategory['Household products'] || 0,
      color: '#6E7FFF',
    },
    {
      label: 'Education',
      amount: transactionsByCategory['Education'] || 0,
      color: '#65E2FF',
    },
    {
      label: 'Leisure',
      amount: transactionsByCategory['Leisure'] || 0,
      color: '#47D5A4',
    },
    {
      label: 'Other expenses',
      amount: transactionsByCategory['Other expenses'] || 0,
      color: '#28B491',
    },
  ];

  const totalExpenses = expenses
    .reduce((sum, expense) => sum + expense.amount, 0)
    .toFixed(2);
  const income = 27350.0;

  return (
    <div className={styles.expenseListContainer}>
      {expenses.map((expense, index) => (
        <div key={index} className={styles.expenseItem}>
          <span
            className={styles.colorBox}
            style={{ backgroundColor: expense.color }}
          ></span>
          <span className={styles.label}>{expense.label}</span>
          <span className={styles.amount}>
            {expense.amount.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      ))}
      <div className={styles.summary}>
        <div className={styles.summaryItem}>
          <span>Expenses:</span>
          <span className={styles.expensesAmount}>{totalExpenses}</span>
        </div>
        <div className={styles.summaryItem}>
          <span>Income:</span>
          <span className={styles.incomeAmount}>
            {income.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default StatisticsTable;
