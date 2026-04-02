import React, { useState } from 'react';
import { X, Plus, DollarSign, Tag, Briefcase } from 'lucide-react';
import type { TransactionType } from '../../types';
import './TransactionModal.css';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (tx: { date: string; description: string; amount: number; category: string; type: TransactionType }) => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: 'Groceries',
    type: 'EXPENSE' as TransactionType,
    date: new Date().toISOString().split('T')[0]
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) {
      alert('Please fill out all fields.');
      return;
    }
    onSave({
      ...formData,
      amount: parseFloat(formData.amount)
    });
    setFormData({ description: '', amount: '', category: 'Groceries', type: 'EXPENSE', date: new Date().toISOString().split('T')[0] });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <header className="modal-header">
          <div className="header-info">
            <Plus size={20} className="header-icon" />
            <div>
              <h3>Log Transaction</h3>
              <p>Record a new entry to your financial log</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </header>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-group-row">
            <div className="form-group flex-2">
              <label>Description</label>
              <div className="input-with-icon">
                <Briefcase size={14} />
                <input 
                  type="text" 
                  placeholder="e.g. Starbucks Coffee" 
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                />
              </div>
            </div>
            <div className="form-group flex-1">
              <label>Amount ($)</label>
              <div className="input-with-icon">
                <DollarSign size={14} />
                <input 
                  type="number" 
                  step="0.01"
                  placeholder="0.00" 
                  value={formData.amount}
                  onChange={e => setFormData({...formData, amount: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="form-group-row">
            <div className="form-group">
              <label>Category</label>
              <div className="input-with-icon">
                <Tag size={14} />
                <select 
                  value={formData.category} 
                  onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option>Groceries</option>
                  <option>Housing</option>
                  <option>Transport</option>
                  <option>Entertainment</option>
                  <option>Income</option>
                  <option>Food & Drink</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Type</label>
              <div className="type-toggle">
                <button 
                  type="button"
                  className={formData.type === 'INCOME' ? 'active income' : ''}
                  onClick={() => setFormData({...formData, type: 'INCOME', category: 'Income'})}
                >
                  Income
                </button>
                <button 
                  type="button"
                  className={formData.type === 'EXPENSE' ? 'active expense' : ''}
                  onClick={() => setFormData({...formData, type: 'EXPENSE', category: 'Groceries'})}
                >
                  Expense
                </button>
              </div>
            </div>
          </div>
        </form>

        <footer className="modal-footer">
          <button type="button" className="outline-btn" onClick={onClose}>Cancel</button>
          <button type="button" className="primary-btn" onClick={handleSubmit}>Create Transaction</button>
        </footer>
      </div>
    </div>
  );
};
