import React, { useState } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilter from './components/ExpenseFilter';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [categories] = useState(['Food', 'Transport', 'Entertainment', 'Utilities']);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const addExpense = (expense) => {
    setExpenses(prevExpenses => [expense, ...prevExpenses]);
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  // Filter expenses by category and date range
  const filteredExpenses = expenses.filter(expense => {
    const categoryMatch = selectedCategory === 'All' || expense.category === selectedCategory;
    const dateMatch = (!startDate || new Date(expense.date) >= new Date(startDate)) && 
                      (!endDate || new Date(expense.date) <= new Date(endDate));
    return categoryMatch && dateMatch;
  });

  return (
    <div className="App">
      <h1>Expense Tracker</h1>
      <ExpenseForm categories={categories} onAddExpense={addExpense} />
      <ExpenseFilter 
        categories={categories} 
        selectedCategory={selectedCategory} 
        onCategoryChange={setSelectedCategory}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <ExpenseList expenses={filteredExpenses} onDelete={deleteExpense} />
    </div>
  );
}

export default App;
