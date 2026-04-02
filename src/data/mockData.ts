import type { Transaction, SummaryData, ChartData, CategoryData } from '../types';

export const MOCK_TRANSACTIONS: Transaction[] = [
  { id: '1', date: '2026-03-01', description: 'Monthly Salary', amount: 5000, category: 'Income', type: 'INCOME' },
  { id: '2', date: '2026-03-02', description: 'Rent Payment', amount: 1500, category: 'Housing', type: 'EXPENSE' },
  { id: '3', date: '2026-03-03', description: 'Whole Foods', amount: 200, category: 'Groceries', type: 'EXPENSE' },
  { id: '4', date: '2026-03-05', description: 'Netflix Subscription', amount: 15.99, category: 'Entertainment', type: 'EXPENSE' },
  { id: '5', date: '2026-03-06', description: 'Uber Ride', amount: 25.50, category: 'Transport', type: 'EXPENSE' },
  { id: '6', date: '2026-03-10', description: 'Freelance Project', amount: 800, category: 'Income', type: 'INCOME' },
  { id: '7', date: '2026-03-12', description: 'Dinner with friends', amount: 120, category: 'Food & Drink', type: 'EXPENSE' },
  { id: '8', date: '2026-03-15', description: 'Gym Membership', amount: 50, category: 'Health', type: 'EXPENSE' },
  { id: '9', date: '2026-03-18', description: 'Amazon Purchase', amount: 85, category: 'Shopping', type: 'EXPENSE' },
  { id: '10', date: '2026-03-20', description: 'Electricity Bill', amount: 95, category: 'Utilities', type: 'EXPENSE' },
  { id: '11', date: '2026-03-22', description: 'Coffee Shop', amount: 6.50, category: 'Food & Drink', type: 'EXPENSE' },
  { id: '12', date: '2026-03-24', description: 'Gas Station', amount: 45, category: 'Transport', type: 'EXPENSE' },
  { id: '13', date: '2026-03-26', description: 'Apple Music', amount: 9.99, category: 'Entertainment', type: 'EXPENSE' },
  { id: '14', date: '2026-03-28', description: 'Target Groceries', amount: 110, category: 'Groceries', type: 'EXPENSE' },
  { id: '15', date: '2026-03-30', description: 'Stock Dividend', amount: 150, category: 'Income', type: 'INCOME' },
];

export const SUMMARY: SummaryData = {
  totalBalance: 12450.50,
  totalIncome: 5950.00,
  totalExpenses: 2262.98,
  savingsRate: 62.1,
};

export const TREND_DATA: ChartData[] = [
  { date: 'Mar 01', balance: 8000, income: 5000, expense: 0 },
  { date: 'Mar 05', balance: 6500, income: 0, expense: 1500 },
  { date: 'Mar 10', balance: 7300, income: 800, expense: 0 },
  { date: 'Mar 15', balance: 7100, income: 0, expense: 200 },
  { date: 'Mar 20', balance: 6900, income: 0, expense: 200 },
  { date: 'Mar 25', balance: 6750, income: 0, expense: 150 },
  { date: 'Mar 30', balance: 6900, income: 150, expense: 0 },
];

export const CATEGORY_BREAKDOWN: CategoryData[] = [
  { name: 'Housing', value: 1500, color: '#6366f1' },
  { name: 'Groceries', value: 310, color: '#10b981' },
  { name: 'Food & Drink', value: 126.5, color: '#f59e0b' },
  { name: 'Transport', value: 70.5, color: '#8b5cf6' },
  { name: 'Entertainment', value: 25.98, color: '#ec4899' },
  { name: 'Other', value: 230, color: '#94a3b8' },
];
