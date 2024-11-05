import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/AuthSlice';
import transactionsReducer from './slices/transactionsSlice';
import globalReducer from './slices/GlobalSlice.jsx';
import expensesReducer from './slices/expensesSlice.jsx';
import { statisticsReducer } from './Statistics/slice';
import { modalsReducer } from './Modals/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionsReducer,
    global: globalReducer,
    expenses: expensesReducer,

    statistics: statisticsReducer,
    modals: modalsReducer,
  },
});

export default store;
