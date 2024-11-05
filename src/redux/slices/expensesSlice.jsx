import { createSlice } from '@reduxjs/toolkit';

const expensesSlice = createSlice({
    name: 'expenses',
    initialState: [],
    reducers: {
        addExpense: (state, action) => {
            state.push(action.payload);
        },
        removeExpense: (state, action) => {
            return state.filter(expense => expense.id !== action.payload);
        },
        setExpenses: (state, action) => {
            return action.payload;
        },
    },
});

export const { addExpense, removeExpense, setExpenses } = expensesSlice.actions;

export default expensesSlice.reducer;
