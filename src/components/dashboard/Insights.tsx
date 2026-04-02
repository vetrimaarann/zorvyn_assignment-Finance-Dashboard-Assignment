import React, { useMemo } from 'react';
import { 
  Zap, 
  TrendingDown, 
  AlertCircle, 
  CheckCircle2, 
  Trophy,
  Activity
} from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboard';
import './Insights.css';

export const Insights: React.FC = () => {
  const { transactions } = useDashboardStore();

  const insights = useMemo(() => {
    // 1. Highest Spending Category
    const categoryTotals: Record<string, number> = {};
    transactions.filter(t => t.type === 'EXPENSE').forEach(t => {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    });

    const entries = Object.entries(categoryTotals);
    const highest = entries.length > 0 
      ? entries.reduce((a, b) => a[1] > b[1] ? a : b) 
      : ['None', 0];

    // 2. Average Transaction Size
    const avgTx = transactions.length > 0 
      ? transactions.reduce((sum, t) => sum + t.amount, 0) / transactions.length 
      : 0;

    // 3. Large transaction alert (Example observation)
    const largeTx = transactions.find(t => t.amount > 1000 && t.type === 'EXPENSE');

    return {
      highestCategory: highest[0],
      highestAmount: highest[1],
      avgTransaction: avgTx.toFixed(2),
      hasLargeExpense: !!largeTx,
      largeExpenseDesc: largeTx?.description
    };
  }, [transactions]);

  return (
    <div className="insights-container">
      <div className="insights-grid">
        {/* Insight Card 1 */}
        <div className="insight-card highlight">
          <div className="insight-icon platinum">
            <Zap size={24} />
          </div>
          <div className="insight-content">
            <h4>Highest Spending Category</h4>
            <div className="insight-value">{insights.highestCategory}</div>
            <p className="insight-description">
              You've spent a total of <strong>${insights.highestAmount.toLocaleString()}</strong> in this category this month.
            </p>
          </div>
        </div>

        {/* Insight Card 2 */}
        <div className="insight-card">
          <div className="insight-icon success">
            <Activity size={24} />
          </div>
          <div className="insight-content">
            <h4>Average Daily Activity</h4>
            <div className="insight-value">${insights.avgTransaction}</div>
            <p className="insight-description">
              Your average transaction size across all categories.
            </p>
          </div>
        </div>

        {/* Insight Card 3 */}
        {insights.hasLargeExpense ? (
          <div className="insight-card warning">
            <div className="insight-icon alert">
              <AlertCircle size={24} />
            </div>
            <div className="insight-content">
              <h4>Unusual Activity Detected</h4>
              <div className="insight-value">Large Expense</div>
              <p className="insight-description">
                A single expense of over $1,000 was recorded for <strong>{insights.largeExpenseDesc}</strong>.
              </p>
            </div>
          </div>
        ) : (
          <div className="insight-card success">
            <div className="insight-icon check">
              <CheckCircle2 size={24} />
            </div>
            <div className="insight-content">
              <h4>Healthy Cash Flow</h4>
              <div className="insight-value">Stable</div>
              <p className="insight-description">
                No unusually large outlier expenses detected in the current period.
              </p>
            </div>
          </div>
        )}

        {/* Insight Card 4 */}
        <div className="insight-card info">
          <div className="insight-icon info">
            <Trophy size={24} />
          </div>
          <div className="insight-content">
            <h4>Savings Milestone</h4>
            <div className="insight-value">62% Rate</div>
            <p className="insight-description">
              You've saved more than half of your income this month. Great progress!
            </p>
          </div>
        </div>
      </div>
      
      <div className="pro-tips">
        <h3>Smart Recommendations</h3>
        <div className="tip-item">
          <TrendingDown size={18} />
          <p>Consider setting a budget for <strong>{insights.highestCategory}</strong> to save an additional $200 next month.</p>
        </div>
        <div className="tip-item">
          < Zap size={18} />
          <p>Your subscription spending is up 12% - review your active services to find potential savings.</p>
        </div>
      </div>
    </div>
  );
};
