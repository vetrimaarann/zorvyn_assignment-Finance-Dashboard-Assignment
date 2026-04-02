import React, { useMemo, useState } from 'react';
import { 
  Search, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  SearchX,
  CreditCard,
  Zap
} from 'lucide-react';
import type { Transaction } from '../../types';
import { useDashboardStore } from '../../store/useDashboard';
import { TransactionModal } from './TransactionModal';
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTx = useMemo(() => getFilteredTransactions(), [
    transactions, searchQuery, categoryFilter, typeFilter, getFilteredTransactions
  ]);

  const categories = Array.from(new Set(transactions.map(t => t.category)));

  const handleSaveTransaction = (tx: Omit<Transaction, 'id'>) => {
    addTransaction(tx);
  };

  return (
    <div className="transactions-container">
      <header className="transactions-header">
        <div className="header-info">
          <h2>Cash Log Explorer <Zap size={18} fill="#f59e0b" color="#f59e0b" /></h2>
          <p>Real-time audit of {filteredTx.length} records in your workspace</p>
        </div>
        
        {role === 'ADMIN' && (
          <button className="add-btn-premium" onClick={() => setIsModalOpen(true)}>
            <Plus size={18} />
            <span>Record Entry</span>
          </button>
        )}
      </header>

      <div className="tx-controls-premium">
        <div className="search-pill-large">
          <Search size={18} />
          <input 
            type="text" 
            placeholder="Search descriptions, categories, or audit logs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-shelf">
          <div className="filter-pill">
            <span className="pill-label">Process:</span>
            <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as any)}>
              <option value="ALL">All Flows</option>
              <option value="INCOME">Income ONLY</option>
              <option value="EXPENSE">Expense ONLY</option>
            </select>
          </div>

          <div className="filter-pill">
            <span className="pill-label">Bucket:</span>
            <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="ALL">All Buckets</option>
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
                <th style={{ width: '120px' }}>Date</th>
                <th>Transaction Log</th>
                <th>Segment</th>
                <th style={{ textAlign: 'right' }}>Magnitude</th>
                <th style={{ textAlign: 'center' }}>Velocity</th>
                {role === 'ADMIN' && <th className="actions-col">Audit</th>}
              </tr>
            </thead>
            <tbody>
              {filteredTx.map((tx) => (
                <tr key={tx.id} className="tx-row">
                  <td className="date-cell">{tx.date}</td>
                  <td>
                    <div className="description-cell">
                      <div className="description-icon">
                        <CreditCard size={14} />
                      </div>
                      {tx.description}
                    </div>
                  </td>
                  <td><span className="category-tag">{tx.category}</span></td>
                  <td style={{ textAlign: 'right' }}>
                    <span className={`amount-modern ${tx.type === 'INCOME' ? 'income' : 'expense'}`}>
                      {tx.type === 'INCOME' ? '+' : '-'} {tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </td>
                  <td>
                    <div className={`velocity-tag ${tx.type.toLowerCase()}`}>
                      {tx.type === 'INCOME' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                      {tx.type}
                    </div>
                  </td>
                  {role === 'ADMIN' && (
                    <td className="actions-col">
                      <button 
                        className="audit-btn" 
                        onClick={() => deleteTransaction(tx.id)}
                        title="Delete log entry"
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
            <h3>No audit records found</h3>
            <p>Refine your search parameters or check filters.</p>
          </div>
        )}
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveTransaction} 
      />
    </div>
  );
};
