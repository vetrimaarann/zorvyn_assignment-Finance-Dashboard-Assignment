import React from 'react';
import { 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight,
  Sparkles,
  Calendar,
  MessageCircle,
  Zap
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
  Cell
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
      {/* 🚀 Personable Header */}
      <header className="dashboard-header-crafted">
        <div className="welcome-section">
          <div className="greeting-pill">Morning, Sunder! ☕</div>
          <h1>Portfolio Snapshot <Sparkles className="sparkle-icon" size={20} /></h1>
          <div className="date-badge">
            <Calendar size={14} />
            <span>{currentDate}</span>
          </div>
        </div>
        
        <div className="quick-action-strip">
          <button className="action-button-organic primary">
            <Zap size={14} />
            Run Audit
          </button>
          <div className="status-indicator">
            <div className="pulse-dot" />
            <span>Synced 2m ago</span>
          </div>
        </div>
      </header>

      {/* 📋 Handcrafted Grid Layout */}
      <div className="dashboard-layout">
        <div className="main-rail">
          <div className="summary-cards-staggered">
            <SummaryCard 
              title="Net Liquid Cash" 
              amount={SUMMARY.totalBalance} 
              icon={DollarSign} 
              trend={12.4} 
              type="positive"
              color="#6366f1"
            />
            <SummaryCard 
              title="Passive Inflow" 
              amount={SUMMARY.totalIncome} 
              icon={ArrowUpRight} 
              trend={8.2} 
              type="positive"
              color="#10b981"
            />
            <SummaryCard 
              title="Burn Rate" 
              amount={SUMMARY.totalExpenses} 
              icon={ArrowDownRight} 
              trend={4.9} 
              type="negative"
              color="#ef4444"
            />
          </div>

          <div className="chart-card-custom trajectory-box">
             <div className="chart-header-custom">
                <div>
                   <h3>Growth Pulse</h3>
                   <p className="subtitle">Real-time balance velocity</p>
                </div>
                <div className="peak-pill">$8,240 Max</div>
             </div>
             <div className="chart-area">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={TREND_DATA}>
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="date" hide />
                    <YAxis hide domain={['auto', 'auto']} />
                    <Tooltip 
                      contentStyle={{borderRadius: '16px', border: 'none', background: '#0f172a', color: 'white', fontWeight: 600}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      stroke="#6366f1" 
                      strokeWidth={4} 
                      fill="url(#colorBalance)" 
                      animationDuration={2000}
                    />
                  </AreaChart>
                </ResponsiveContainer>
             </div>
          </div>
        </div>

        <aside className="side-rail">
          {/* ✍️ Handwritten Sticky Note (Human Kill) */}
          <div className="sticky-note-wrapper">
             <div className="sticky-note">
                <div className="sticky-pin" />
                <h4 className="handwritten">Personal Note:</h4>
                <p className="handwritten">
                  "Don't forget to pay the quarterly tax on the 15th. Also, rent increases next month by $50. Update the sheets!"
                </p>
                <div className="sticky-footer">
                  <span className="handwritten">- Sunder</span>
                </div>
             </div>
          </div>

          <div className="interactive-widget budget-tracker">
             <h4>Bucket Split</h4>
             <div className="mini-pie-container">
                <ResponsiveContainer width="100%" height={160}>
                  <PieChart>
                    <Pie
                      data={CATEGORY_BREAKDOWN}
                      innerRadius={45}
                      outerRadius={65}
                      stroke="none"
                      paddingAngle={5}
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
             <div className="legend-crafted">
                {CATEGORY_BREAKDOWN.slice(0, 3).map(c => (
                  <div key={c.name} className="legend-pill">
                    <span className="dot" style={{backgroundColor: c.color}} />
                    <span>{c.name}</span>
                  </div>
                ))}
             </div>
          </div>

          <div className="tip-bubble">
             <MessageCircle size={16} />
             <span>Buy more index funds?</span>
          </div>
        </aside>
      </div>

      <footer className="footer-callout-organic">
        <div className="callout-content">
          <h3>Your momentum is building.</h3>
          <p>You're in the top 5% of savers on Zorvyn this month. Let's keep it up!</p>
        </div>
        <button className="callout-button">Plan Horizon</button>
      </footer>
    </div>
  );
};
