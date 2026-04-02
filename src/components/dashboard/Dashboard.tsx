import React from 'react';
import { 
  TrendingUp, 
  Target, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
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
  return (
    <div className="dashboard-container">
      <div className="dashboard-grid">
        <SummaryCard 
          title="Total Balance" 
          amount={SUMMARY.totalBalance} 
          icon={DollarSign} 
          trend={12} 
          type="positive"
          color="#6366f1"
        />
        <SummaryCard 
          title="Monthly Income" 
          amount={SUMMARY.totalIncome} 
          icon={ArrowUpRight} 
          trend={8} 
          type="positive"
          color="#10b981"
        />
        <SummaryCard 
          title="Total Expenses" 
          amount={SUMMARY.totalExpenses} 
          icon={ArrowDownRight} 
          trend={5} 
          type="negative"
          color="#ef4444"
        />
        <SummaryCard 
          title="Savings Rate" 
          amount={SUMMARY.totalBalance * 0.62} 
          icon={Target} 
          trend={2} 
          type="positive"
          color="#8b5cf6"
        />
      </div>

      <div className="charts-grid">
        <div className="chart-card balance-trend">
          <div className="chart-header">
            <h3>Balance Growth Overview</h3>
            <span className="chart-subtitle">Last 30 days financial activity</span>
          </div>
          <div className="chart-content">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={TREND_DATA}>
                <defs>
                  <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <YAxis hide domain={['auto', 'auto']} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}
                />
                <Area 
                  type="monotone" 
                  dataKey="balance" 
                  stroke="#6366f1" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorBalance)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="chart-card spending-breakdown">
          <div className="chart-header">
            <h3>Categorical Spending</h3>
            <span className="chart-subtitle">Direct expenses distribution</span>
          </div>
          <div className="chart-content pie-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={CATEGORY_BREAKDOWN}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {CATEGORY_BREAKDOWN.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
         <div className="chart-card">
            <div className="chart-header">
               <h3>Market Overview</h3>
               <span className="chart-subtitle">Mock trend data for demo</span>
            </div>
            <div className="chart-content">
               <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--success)', fontWeight: 600}}>
                  <TrendingUp size={20} />
                  <span>Market is bullish (+2.4%)</span>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
