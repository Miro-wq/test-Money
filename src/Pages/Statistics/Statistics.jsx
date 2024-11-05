import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getTransactionsSummaryByPeriod,
  getTransactionsCategories,
} from '../../redux/Statistics/operations';
import {
  selectSummary,
  selectCategories,
  selectStatLoading,
  selectStatError,
} from '../../redux/Statistics/selectors';
import styles from './Statistics.module.css';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import Chart from '../../components/Chart/Chart';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';

const Statistics = () => {
  const dispatch = useDispatch();
  const summary = useSelector(selectSummary);
  const categories = useSelector(selectCategories);
  const isLoading = useSelector(selectStatLoading);
  const isError = useSelector(selectStatError);

  useEffect(() => {
    dispatch(getTransactionsSummaryByPeriod({ month: '10', year: '2024' }));
    dispatch(getTransactionsCategories());
  }, [dispatch]);

  useEffect(() => {
    console.log('Summary:', summary);
    console.log('Categories:', categories);
  }, [summary, categories]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    console.error('Error details:', isError);
    console.error('Additional information:', summary, categories);
    return <p>Error loading statistics</p>;
  }

  return (
    <div className={styles.staticAll}>
      <div className={styles.statisticsSection}>
        <h2>Statistics</h2>
        <Chart summary={summary} />
      </div>
      <div className={styles.statisticsTable}>
        <StatisticsDashboard categories={categories} />
        <StatisticsTable summary={summary} categories={categories} />
      </div>
    </div>
  );
};

export default Statistics;
