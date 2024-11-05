import PropTypes from 'prop-types';
import TransactionsDesktopRow from '../../components/TransactionsDesktopRow/TransactionsDesktopRow';
import styles from './TransactionsDesktop.module.css';

const TransactionsDesktop = ({ data, openDeleteModal, openEditModal }) => {
  const compareTransactions = (a, b) => {
    const dateComparison =
      new Date(a.transactionDate) - new Date(b.transactionDate);
    if (dateComparison === 0) {
      if (a.type === 'INCOME' && b.type !== 'INCOME') {
        return -1;
      }
      if (a.type !== 'INCOME' && b.type === 'INCOME') {
        return 1;
      }
    }
    return dateComparison;
  };

  const sortedData = [...data].sort(compareTransactions);

  return (
    <div className={styles.TransactionsTable}>
      <table className={styles.table}>
        <thead className={styles.tableHead}>
          <tr className={styles.tableHeadRow}>
            <th className={styles.dateColumn}>Date</th>
            <th className={styles.typeColumn}>Type</th>
            <th className={styles.categoryColumn}>Category</th>
            <th className={styles.commentColumn}>Comment</th>
            <th className={styles.sumColumn}>Sum</th>
            <th className={styles.editColumn}></th>
            <th className={styles.deleteColumn}></th>
          </tr>
        </thead>
        <tbody className={styles.tableBody}>
          {sortedData.map(item => (
            <TransactionsDesktopRow
              key={item.id}
              transaction={item}
              openDeleteModal={openDeleteModal}
              openEditModal={openEditModal}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

TransactionsDesktop.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default TransactionsDesktop;
