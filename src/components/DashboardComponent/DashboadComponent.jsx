import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import styles from './DashboardComponent.module.css';
import { useDispatch } from 'react-redux';
import { fetchTransactionsSummary } from '../../redux/transactions/operations';

const StatisticsDashboard = () => {
  const dispatch = useDispatch();
  const [selectedMonth, setSelectedMonth] = useState({
    value: 3,
    label: 'March',
  });
  const [selectedYear, setSelectedYear] = useState({
    value: 2024,
    label: '2024',
  });

  const onMonthChange = month => setSelectedMonth(month);
  const onYearClick = year => setSelectedYear(year);

  const optionsYears = [
    { value: 2024, label: '2024' },
    { value: 2023, label: '2023' },
    { value: 2022, label: '2022' },
    { value: 2021, label: '2021' },
    { value: 2019, label: '2019' },
    { value: 2018, label: '2018' },
    { value: 2017, label: '2017' },
  ];

  const optionsMonth = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' },
  ];

  useEffect(() => {
    const data = { month: selectedMonth.value, year: selectedYear.value };
    dispatch(fetchTransactionsSummary(data));
  }, [dispatch, selectedMonth, selectedYear]);

  return (
    <div className={styles.mainDiv}>
      <Select
        value={selectedMonth}
        onChange={onMonthChange}
        options={optionsMonth}
        placeholder={selectedMonth.label}
        // styles={customStyles}
      />
      <Select
        value={selectedYear}
        onChange={onYearClick}
        options={optionsYears}
        placeholder={selectedYear.label}
        // styles={customStyles}
      />
    </div>
  );
};

export default StatisticsDashboard;
