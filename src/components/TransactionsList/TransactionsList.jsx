import PropTypes from 'prop-types';
import TransactionsItem from '../../components/TransactionsItem/TransactionsItem';
import styles from './TransactionsList.module.css';

const TransactionsList = ({ data, openDeleteModal, openEditModal }) => {
  const sortedData = [...data].sort((a, b) => {
    if (a.transactionDate < b.transactionDate) return -1;
    if (a.transactionDate > b.transactionDate) return 1;
    if (a.type === 'INCOME' && b.type === 'EXPENSE') return -1;
    if (a.type === 'EXPENSE' && b.type === 'INCOME') return 1;
    return 0;
  });

  return (
    <ul className={styles.TransactionList}>
      {sortedData.map(item => (
        <TransactionsItem
          key={item.id}
          transaction={item}
          openDeleteModal={openDeleteModal}
          openEditModal={openEditModal}
        />
      ))}
    </ul>
  );
};

TransactionsList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default TransactionsList;
