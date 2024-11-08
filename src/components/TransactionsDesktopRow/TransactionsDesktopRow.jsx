import PropTypes from 'prop-types';
import { formatData, getTransactionCategory } from '../common/allCategories';
import icons from '../images/icons/sprite.svg';
import styles from './TransactionsDesktopRow.module.css';
import {
  setTrasactionForUpdate,
  setTrasactionIdForDelete,
} from '../../redux/slices/transactionsSlice';
import { useDispatch } from 'react-redux';
import { formatNumberWithSpaces } from '../common/formatNumberWithSpaces';

const TransactionsDesktopRow = ({
  transaction,
  openDeleteModal,
  openEditModal,
}) => {
  const { type, categoryId, comment, amount, transactionDate } = transaction;

  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    openDeleteModal();
    dispatch(setTrasactionIdForDelete(transaction.id));
  };

  const handleEditClick = () => {
    openEditModal();
    dispatch(
      setTrasactionForUpdate({
        id: transaction.id,
        type: transaction.type,
        categoryId: transaction.categoryId,
        amount: transaction.amount,
        transactionDate: transaction.transactionDate,
        comment: transaction.comment,
      })
    );
  };

  let textClass = '';

  if (type === 'INCOME') {
    textClass = styles.incomeText;
  } else if (type === 'EXPENSE') {
    textClass = styles.expenseText;
  }

  return (
    <tr className={styles.dataRow}>
      <td className={styles.TransactionDateColumn}>
        {formatData(transactionDate)}
      </td>
      <td className={styles.TransactionTypeColumn}>
        {type === 'INCOME' ? '+' : '-'}
      </td>
      <td className={styles.TransactionCategoryColumn}>
        {getTransactionCategory(categoryId)}
      </td>
      <td className={styles.TransactionCommentColumn}>{comment}</td>
      <td className={`${styles.TransactionAmountColumn} ${textClass}`}>
        {type === 'INCOME'
          ? formatNumberWithSpaces(amount)
          : formatNumberWithSpaces(amount * -1)}
      </td>

      <td className={styles.TransactionEditColumn}>
        <button
          className={styles.editButton}
          type="button"
          onClick={handleEditClick}
        >
          <svg className={styles.editIcon}>
            <use href={`${icons}#icon-edit`}></use>
          </svg>
        </button>
      </td>

      <td className={styles.TransactionDeleteColumn}>
        <button
          className={styles.deleteButton}
          type="button"
          onClick={handleDeleteClick}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

TransactionsDesktopRow.propTypes = {
  transaction: PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    categoryId: PropTypes.string.isRequired,
    comment: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    transactionDate: PropTypes.string.isRequired,
  }).isRequired,
  openDeleteModal: PropTypes.func.isRequired,
  openEditModal: PropTypes.func.isRequired,
};

export default TransactionsDesktopRow;
