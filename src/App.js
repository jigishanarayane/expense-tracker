import { useState } from 'react';
import './App.css';

function App() {
  const [transactions, setTransactions] = useState([
    { id: 1, text: 'Salary', amount: 5000, type: 'income' },
    { id: 2, text: 'Rent', amount: -1500, type: 'expense' },
    { id: 3, text: 'Food', amount: -200, type: 'expense' },
  ]);
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');

  const income = transactions
    .filter(t => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter(t => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  function addTransaction() {
    if (text.trim() === '' || amount === '') return;
    const newTransaction = {
      id: Date.now(),
      text: text,
      amount: type === 'expense' ? -Math.abs(Number(amount)) : Math.abs(Number(amount)),
      type: type
    };
    setTransactions([newTransaction, ...transactions]);
    setText('');
    setAmount('');
  }

  function deleteTransaction(id) {
    setTransactions(transactions.filter(t => t.id !== id));
  }

  return (
    <div className="app">
      <div className="container">
        <h1>💰 Expense Tracker</h1>

        {/* BALANCE */}
        <div className="balance-box">
          <p>Total Balance</p>
          <h2 className={balance >= 0 ? 'positive' : 'negative'}>
            ₹{balance.toLocaleString()}
          </h2>
        </div>

        {/* INCOME EXPENSE */}
        <div className="summary">
          <div className="summary-item income">
            <p>Income</p>
            <h3>+₹{income.toLocaleString()}</h3>
          </div>
          <div className="summary-item expense">
            <p>Expenses</p>
            <h3>-₹{Math.abs(expense).toLocaleString()}</h3>
          </div>
        </div>

        {/* ADD TRANSACTION */}
        <div className="form">
          <h3>Add Transaction</h3>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Description (e.g. Salary, Food)"
          />
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <div className="type-selector">
            <button
              className={type === 'expense' ? 'active-expense' : ''}
              onClick={() => setType('expense')}
            >
              Expense
            </button>
            <button
              className={type === 'income' ? 'active-income' : ''}
              onClick={() => setType('income')}
            >
              Income
            </button>
          </div>
          <button className="add-btn" onClick={addTransaction}>Add Transaction</button>
        </div>

        {/* TRANSACTION LIST */}
        <div className="transactions">
          <h3>Transaction History</h3>
          {transactions.length === 0 && <p className="empty">No transactions yet</p>}
          {transactions.map(t => (
            <div key={t.id} className={`transaction ${t.type}`}>
              <span className="transaction-text">{t.text}</span>
              <span className={`transaction-amount ${t.amount > 0 ? 'pos' : 'neg'}`}>
                {t.amount > 0 ? '+' : ''}₹{Math.abs(t.amount).toLocaleString()}
              </span>
              <button className="delete-btn" onClick={() => deleteTransaction(t.id)}>✕</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;