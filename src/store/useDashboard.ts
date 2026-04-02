import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Transaction, Role, TransactionType } from '../types';
import { MOCK_TRANSACTIONS } from '../data/mockData';

interface DashboardState {
  role: Role;
  transactions: Transaction[];
  searchQuery: string;
  categoryFilter: string;
  typeFilter: TransactionType | 'ALL';
  
  // Actions
  setRole: (role: Role) => void;
  setSearchQuery: (query: string) => void;
  setCategoryFilter: (category: string) => void;
  setTypeFilter: (type: TransactionType | 'ALL') => void;
  
  // Add Transaction (Only if Role is ADMIN)
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  deleteTransaction: (id: string) => void;
  
  // Analytics
  getFilteredTransactions: () => Transaction[];
}

export const useDashboardStore = create<DashboardState>()(
  persist(
    (set, get) => ({
      role: 'ADMIN',
      transactions: MOCK_TRANSACTIONS,
      searchQuery: '',
      categoryFilter: 'ALL',
      typeFilter: 'ALL',

      setRole: (role) => set({ role }),
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
      setTypeFilter: (typeFilter) => set({ typeFilter }),

      addTransaction: (tx) => {
        if (get().role !== 'ADMIN') return;
        const newTx = { ...tx, id: Math.random().toString(36).substr(2, 9) };
        set((state) => ({ transactions: [newTx, ...state.transactions] }));
      },

      deleteTransaction: (id) => {
        if (get().role !== 'ADMIN') return;
        set((state) => ({ transactions: state.transactions.filter(t => t.id !== id) }));
      },

      getFilteredTransactions: () => {
        const { transactions, searchQuery, categoryFilter, typeFilter } = get();
        return transactions.filter(t => {
          const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) || 
                               t.category.toLowerCase().includes(searchQuery.toLowerCase());
          const matchesCategory = categoryFilter === 'ALL' || t.category === categoryFilter;
          const matchesType = typeFilter === 'ALL' || t.type === typeFilter;
          return matchesSearch && matchesCategory && matchesType;
        });
      }
    }),
    {
      name: 'finance-dashboard-store',
      // only persist transactions for now to simulate a "refresh persistent" state
      partialize: (state) => ({ transactions: state.transactions, role: state.role }),
    }
  )
);
