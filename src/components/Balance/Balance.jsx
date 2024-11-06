import { useEffect } from 'react';

import { selectBalance } from '../../redux/selectors/authSelectors';
import styles from './Balance.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo } from '../../redux/operations/authOperations';
import { formatNumberWithSpaces } from '../common/formatNumberWithSpaces';

function Balance() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserInfo());
    console.log('balance', balance);
  }, [dispatch]);

  const balance = useSelector(selectBalance);

  return (
    <div className={styles.balance}>
      <h3>Your balance</h3>
      <p>
        ₴ <span>{balance ? formatNumberWithSpaces(balance) : '0.00'}</span>
      </p>
    </div>
  );
}

export default Balance;
