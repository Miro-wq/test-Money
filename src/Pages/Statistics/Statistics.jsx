import React from 'react';
import styles from './Statistics.module.css';
import StatisticsDashboard from '../../components/StatisticsDashboard/StatisticsDashboard';
import Chart from '../../components/Chart/Chart';
import StatisticsTable from '../../components/StatisticsTable/StatisticsTable';

const Statistics = () => {
  return (
    <div className={styles.staticAll}>
      <div className={styles.statisticsSection}>
        <h2>Statistics</h2>
        <Chart />
      </div>
      <div className={styles.statisticsTable}>
        <StatisticsDashboard />
        <StatisticsTable />
      </div>
    </div>
  );
};

export default Statistics;
