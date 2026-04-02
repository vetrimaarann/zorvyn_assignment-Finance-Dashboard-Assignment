import React from 'react';
import { LayoutDashboard, ReceiptText, BarChart3, Settings, ShieldCheck, ShieldAlert } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboard';
import './Sidebar.css';

interface SidebarProps {
  activeTab: 'dashboard' | 'transactions' | 'insights';
  setActiveTab: (tab: 'dashboard' | 'transactions' | 'insights') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { role } = useDashboardStore();

  const menuItems = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'transactions', label: 'Transactions', icon: ReceiptText },
    { id: 'insights', label: 'Finance Insights', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">ZF</div>
        <div className="logo-text">Zorvyn FinTech</div>
      </div>
      
      <div className="role-indicator">
        {role === 'ADMIN' ? (
          <div className="badge admin"><ShieldCheck size={14} /> Admin Mod</div>
        ) : (
          <div className="badge viewer"><ShieldAlert size={14} /> View only</div>
        )}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id as any)}
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item">
          <Settings size={20} />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  );
};
