import React, { useMemo } from 'react';
import { 
  Filter, 
  Search, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  SearchX,
  CreditCard
} from 'lucide-react';
import type { Transaction, TransactionType } from '../../types';
import { useDashboardStore } from '../../store/useDashboard';
import './Transactions.css';

export const Transactions: React.FC = () => {
  const { 
    role, 
    transactions, 
    addTransaction, 
    deleteTransaction,
    searchQuery,
    setSearchQuery,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    getFilteredTransactions
  } = useDashboardStore();

  const filteredTx = useMemo(() => getFilteredTransactions(), [
    transactions, searchQuery, categoryFilter, typeFilter, getFilteredTransactions
  ]);

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  const handleAddDemo = () => {
    addTransaction({
      date: new Date().toISOString().split('T')[0],
      description: 'Demo Transaction',
      amount: Math.floor(Math.random() * 500) + 1,
      category: 'Other',
      type: 'EXPENSE'
    });
  };

  return (
    <div className="transactions-container">
      <div className="tx-header">
        <div className="tx-title-section">
          <h2>Transactional History</h2>
          <p>Displaying {filteredTx.length} records found in search</p>
        </div>
        
        {role === 'ADMIN' && (
          <button className="add-btn" onClick={handleAddDemo}>
            <Plus size={18} />
            <span>Add Transaction</span>
          </button>
        )}
      </div>

      <div className="tx-controls">
        <div className="search-box">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search descriptions..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filters">
          <div className="filter-group">
            <Filter size={14} />
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)}>
              <option value="ALL">All Types</option>
              <option value="INCOME">Income</option>
              <option value="EXPENSE">Expense</option>
            </select>
          </div>

          <div className="filter-group">
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="ALL">All Categories</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="tx-table-wrapper">
        {filteredTx.length > 0 ? (
          <table className="tx-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Type</th>
                {role === 'ADMIN' && <th className="actions-col">Actions</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTx.map((tx) => (
                <tr key={tx.id} className="tx-row">
                  <td>{tx.date}</td>
                  <td>
                    <div className="description-cell">
                      <div className="description-icon">
                        <CreditCard size={14} />
                      </div>
                      {tx.description}
                    </div>
                  </td>
                  <td><span className="category-tag">{tx.category}</span></td>
                  <td>
                    <span className={`amount ${tx.type === 'INCOME' ? 'income' : 'expense'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'} ${tx.amount.toLocaleString()}
                    </span>
                  </td>
                  <td>
                    <div className={`type-tag ${tx.type.toLowerCase()}`}>
                      {tx.type === 'INCOME' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {tx.type}
                    </div>
                  </td>
                  {role === 'ADMIN' && (
                    <td className="actions-col">
                      <button 
                        className="delete-btn" 
                        onClick={() => deleteTransaction(tx.id)}
                        title="Delete transaction"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty-state">
            <SearchX size={48} />
            <h3>No results found</h3>
            <p>Try adjusting your search query or filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
