import React from 'react';
import { useSelector } from 'react-redux';
import { Oval } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  const isLoading = useSelector(state => state.global.isLoading);

  return (
    isLoading && (
      <div className={styles.loaderOverlay}>
        <Oval
          height={80}
          width={80}
          color="#4fa94d"
          ariaLabel="loading"
          secondaryColor="#4fa94d"
        />
      </div>
    )
  );
};

export default Loader;
