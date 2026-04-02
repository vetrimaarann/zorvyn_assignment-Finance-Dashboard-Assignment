import React from 'react';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Target
} from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboard';
import './Insights.css';

export const Insights: React.FC = () => {
  const { transactions } = useDashboardStore();

  const totalSpent = transactions
    .filter(t => t.type === 'EXPENSE')
    .reduce((sum, t) => sum + t.amount, 0);

  const highestCategory = Object.entries(
    transactions
      .filter(t => t.type === 'EXPENSE')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {} as Record<string, number>)
  ).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="insights-container">
      <header className="insights-header">
        <div className="header-info">
          <h2>Intelligence Engine <Zap size={18} fill="#f59e0b" color="#f59e0b" /></h2>
          <p>Heuristic-based analysis of your financial footprint</p>
        </div>
        <div className="intelligence-score">
          <div className="score-circle">
            <span className="score-num">84</span>
            <span className="score-label">/100</span>
          </div>
          <span className="score-tag">Health: Optimal</span>
        </div>
      </header>

      <div className="insights-grid">
        {/* 1. Critical Observation */}
        <section className="insight-card highlight">
          <div className="card-icon warning">
            <AlertTriangle size={24} />
          </div>
          <div className="card-body">
            <h3>Leakage Detection</h3>
            <p>Your <strong>{highestCategory?.[0]}</strong> spending is <strong>14% higher</strong> than your 3-month average. Consider auditing recent invoices.</p>
            <div className="card-actions">
              <button className="text-link">Review Category <ArrowRight size={14} /></button>
            </div>
          </div>
        </section>

        {/* 2. Positive Trend */}
        <section className="insight-card success">
          <div className="card-icon check">
            <CheckCircle2 size={24} />
          </div>
          <div className="card-body">
            <h3>Savings Trajectory</h3>
            <p>At your current velocity, you'll hit your **$15k emergency fund goal** by August 2026. You're 2 months ahead of schedule!</p>
            <div className="progress-bar-mini">
              <div className="progress-fill" style={{ width: '82%' }} />
            </div>
          </div>
        </section>

        {/* 3. Personalized Tip - Human Touch */}
        <section className="insight-card info">
          <div className="card-icon tip">
            <Lightbulb size={24} />
          </div>
          <div className="card-body">
            <h3>Wealth Wisdom</h3>
            <p>"The 50/30/20 rule of thumb is a great starting point, but your utility costs are unusually low. Consider aggressive re-allocation to equity."</p>
            <span className="quote-author">— Zorvyn Portfolio Bot</span>
          </div>
        </section>

        {/* 4. Tax Strategy */}
        <section className="insight-card primary">
          <div className="card-icon shield">
            <ShieldCheck size={24} />
          </div>
          <div className="card-body">
            <h3>Tax Efficiency</h3>
            <p>We've detected <strong>3 transactions</strong> eligible for business deduction. Marking them could save you approximately <strong>$142</strong> in liability.</p>
            <button className="primary-pill">Apply Tax Tags</button>
          </div>
        </section>
      </div>

      <div className="insights-footer">
        <div className="footer-promo">
          <Target size={32} color="var(--primary)" />
          <div>
            <h4>Unlock Advanced Forecasting</h4>
            <p>Join our priority waitlist for predictive cash-flow modeling and automated tax filing.</p>
          </div>
        </div>
        <button className="outline-btn">Learn More</button>
      </div>
    </div>
  );
};
