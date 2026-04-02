import React from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Calendar,
  Clock,
  ExternalLink
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart, 
  Pie, 
  Cell,
  Legend
} from 'recharts';
import { SummaryCard } from './SummaryCard';
import { TREND_DATA, CATEGORY_BREAKDOWN, SUMMARY } from '../../data/mockData';
import './Dashboard.css';

export const Dashboard: React.FC = () => {
  const currentDate = new Date().toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="dashboard-container">
      {/* Human-Touch Header */}
      <header className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, Sunder <Sparkles className="sparkle-icon" size={24} /></h1>
          <div className="date-display">
            <Calendar size={14} />
            <span>{currentDate}</span>
            <span className="dot">•</span>
            <Clock size={14} />
            <span>11:20 PM</span>
          </div>
        </div>
        
        <div className="quick-actions">
          <button className="action-pill primary">
            <Sparkles size={14} />
            Generate AI Report
          </button>
          <button className="action-pill secondary">
            <ExternalLink size={14} />
            Explore Logs
          </button>
        </div>
      </header>

      {/* Main Grid View */}
      <div className="dashboard-grid">
        <SummaryCard 
          title="Total Net Worth" 
          amount={SUMMARY.totalBalance} 
          icon={DollarSign} 
          trend={12.4} 
          type="positive"
          color="#6366f1"
        />
        <SummaryCard 
          title="Active Income" 
          amount={SUMMARY.totalIncome} 
          icon={ArrowUpRight} 
          trend={8.2} 
          type="positive"
          color="#10b981"
        />
        <SummaryCard 
          title="Debt & Expenses" 
          amount={SUMMARY.totalExpenses} 
          icon={ArrowDownRight} 
          trend={4.9} 
          type="negative"
          color="#ef4444"
        />
        <SummaryCard 
          title="Savings Milestone" 
          amount={SUMMARY.totalBalance * 0.62} 
          icon={Target} 
          trend={2.1} 
          type="positive"
          color="#f59e0b"
        />
      </div>

      <div className="charts-grid-modern">
        <div className="chart-card-premium balance-area">
          <div className="chart-info">
            <div className="info-title">
              <h3>Balance Trajectory</h3>
              <p>Performance over current billing cycle</p>
            </div>
            <div className="chart-stat">
              <span className="stat-label">Peak</span>
              <span className="stat-value">$8,000</span>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={260}>
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="6 6" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" hide />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', background: '#1e293b', color: 'white', fontSize: '12px'}}
                />
                <Area 
                  type="stepAfter" 
                  dataKey="balance" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  fill="url(#colorBalance)" 
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card-premium donut-pie">
          <div className="chart-info">
            <div className="info-title">
              <h3>Allocation Pool</h3>
              <p>Top categorical buckets</p>
            </div>
          </div>
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie
                  data={CATEGORY_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  stroke="none"
                  paddingAngle={8}
                  dataKey="value"
                >
                  {CATEGORY_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="category-legend">
            {CATEGORY_BREAKDOWN.slice(0, 3).map(c => (
              <div key={c.name} className="legend-item">
                <span className="dot" style={{backgroundColor: c.color}} />
                <span className="label">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inspirational Footer Section - Real Human Touch */}
      <footer className="dashboard-footer-banner">
        <div className="banner-content">
          <h3>Your financial freedom score is increasing.</h3>
          <p>You've saved **$842** more this month than your average. Keep the momentum!</p>
        </div>
        <button className="banner-btn">Plan Next Month</button>
      </footer>
    </div>
  );
};
