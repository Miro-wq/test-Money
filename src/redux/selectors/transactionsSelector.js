import { createSelector } from 'reselect';

const selectAllTransactions = state => state.transactions.items;
const selectTotalBalance = state => state.transactions.totalBalance;
const selectError = state => state.transactions.error;
const selectTrasactionIdForDelete = state =>
  state.transactions.trasactionIdForDelete;

const selectTransactionForUpdate = state =>
  state.transactions.transactionForUpdate;

const selectTransactionsSummary = state => {
  const transactions = state.transactions.items;
  const totalAmount = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0
  );

  return totalAmount;
};

const selectTransactionsByCategory = createSelector(
  state => state.transactions.items,
  transactions => {
    console.log('Tranzacții primite în selector:', transactions);
    return transactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (category) {
        acc[category] = (acc[category] || 0) + amount;
      }
      return acc;
    }, {});
  }
);

export {
  selectAllTransactions,
  selectTotalBalance,
  selectError,
  selectTransactionForUpdate,
  selectTrasactionIdForDelete,
  selectTransactionsSummary,
  selectTransactionsByCategory,
};
