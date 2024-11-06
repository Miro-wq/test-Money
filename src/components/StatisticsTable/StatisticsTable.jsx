import React from 'react';
import { useSelector } from 'react-redux';
import styles from './StatisticsTable.module.css';
import {
  selectExpensesByCategory,
  selectTotalExpenses,
  selectTotalBalance,
} from '../../redux/selectors/transactionsSelector';

const StatisticsTable = () => {
  const expensesByCategory = useSelector(selectExpensesByCategory);
  const totalExpenses = useSelector(selectTotalExpenses);
  const totalIncome = useSelector(selectTotalBalance);
  console.log('totalIncome', totalIncome);

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

  return (
    <table className={styles.statisticsTable}>
      <thead className={styles.tableHead}>
        <tr>
          <th>Category</th>
          <th className={styles.end}>Sum</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(({ label, color }) => (
          <tr key={label}>
            <td>
              <span
                className={styles.colorBox}
                style={{ backgroundColor: color }}
              ></span>
              {label}
            </td>
            <td className={styles.end}>
              {expensesByCategory[label]
                ? expensesByCategory[label].toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })
                : '0.00'}
            </td>
          </tr>
        ))}
        <tr className={styles.totalRow}>
          <td>Expenses:</td>
          <td className={`${styles.end} ${styles.expensesTotal}`}>
            {totalExpenses}
          </td>
        </tr>
        <tr className={styles.incomeRow}>
          <td>Income:</td>
          <td className={`${styles.end} ${styles.incomeTotal}`}>
            {totalIncome}{' '}
            {/* =============================pregatit pentru income =================================*/}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default StatisticsTable;
