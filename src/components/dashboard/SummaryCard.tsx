import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import './SummaryCard.css';

interface SummaryCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  trend?: number;
  type?: 'positive' | 'negative' | 'neutral';
  color?: string;
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ 
  title, amount, icon: Icon, trend, type = 'neutral', color = 'var(--primary)' 
}) => {
  const formattedAmount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);

  return (
    <div className="summary-card" style={{ '--accent-color': color } as any}>
      <div className="card-header">
        <span className="card-title">{title}</span>
        <div className="card-icon" style={{ backgroundColor: `var(--accent-color-bg, ${color}20)` }}>
          <Icon size={20} color={color} />
        </div>
      </div>
      
      <div className="card-body">
        <h2 className="card-amount">{formattedAmount}</h2>
        {trend && (
          <div className={`card-trend ${type}`}>
            {type === 'positive' ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            <span>{trend}% from last month</span>
          </div>
        )}
      </div>
    </div>
  );
};
