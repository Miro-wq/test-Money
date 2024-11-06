import { createSelector } from 'reselect';

const categoryMapping = {
  'c9d9e447-1b83-4238-8712-edc77b18b739': 'Main expenses',
  '27eb4b75-9a42-4991-a802-4aefe21ac3ce': 'Products',
  '128673b5-2f9a-46ae-a428-ec48cf1effa1': 'Household products',
  '3caa7ba0-79c0-40b9-ae1f-de1af1f6e386': 'Car',
  'bbdd58b8-e804-4ab9-bf4f-695da5ef64f4': 'Self care',
  '76cc875a-3b43-4eae-8fdb-f76633821a34': 'Child care',
  '1272fcc4-d59f-462d-ad33-a85a075e5581': 'Education',
  'c143130f-7d1e-4011-90a4-54766d4e308e': 'Leisure',
  '3acd0ecd-5295-4d54-8e7c-d3908f4d0402': 'Entertainment',
  '719626f1-9d23-4e99-84f5-289024e437a8': 'Other expenses',
  '063f1132-ba5d-42b4-951d-44011ca46262': 'Income',
};

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
  console.log('Total transactions amount:', totalAmount); // Log pentru totalul tranzacțiilor
  return totalAmount;
};

const selectTransactionsByCategory = createSelector(
  state => state.transactions.items,
  transactions => {
    console.log('Tranzacții primite în selector (by category):', transactions);
    const result = transactions.reduce((acc, transaction) => {
      const { category, amount } = transaction;
      if (category) {
        acc[category] = (acc[category] || 0) + amount;
      }
      return acc;
    }, {});
    console.log('Total by category:', result); // Log pentru suma totală pe fiecare categorie
    return result;
  }
);

const selectExpensesByCategory = createSelector(
  selectAllTransactions,
  transactions => {
    console.log('Tranzacții pentru categorii de cheltuieli:', transactions);
    const result = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'EXPENSE') {
        const categoryId = transaction.categoryId; // pt ID categorie
        const categoryName = categoryMapping[categoryId] || 'Unknown'; // Mapare ID la numele categoriei
        acc[categoryName] =
          (acc[categoryName] || 0) + Math.abs(transaction.amount);
      }
      return acc;
    }, {});
    console.log('Total cheltuieli pe categorii:', result);
    return result;
  }
);

const selectTotalExpenses = createSelector(
  selectExpensesByCategory,
  expenses => {
    console.log('Cheltuieli totale:', expenses);
    const totalExpenses = Object.values(expenses).reduce(
      (sum, amount) => sum + amount,
      0
    );
    console.log('Sumă totală cheltuieli:', totalExpenses); // Log pentru totalul cheltuielilor
    return totalExpenses;
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
  selectExpensesByCategory,
  selectTotalExpenses,
};
