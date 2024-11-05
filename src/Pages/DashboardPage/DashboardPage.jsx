import React, { Suspense } from 'react';
import Balance from '../../components/Balance/Balance';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Currency from '../../components/Currency/Currency';
import { useMediaQuery } from 'react-responsive';
import styles from './DashboardPage.module.css';
import Loader from 'components/Loader/Loader';
import { Outlet } from 'react-router-dom';

const DashboardPage = () => {
  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });

  return (
    <>
      <Header />
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sharedSectionElements}>
            <div className={styles.navAndBalanceContainer}>
              <Navigation />
              {isTablet && <Balance />}
            </div>

            {isTablet && <Currency />}
          </div>
          <Suspense fallback={<Loader />}>
            <Outlet />
          </Suspense>
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
