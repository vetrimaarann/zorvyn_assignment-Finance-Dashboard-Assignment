import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ReceiptText, 
  BarChart3, 
  Settings, 
  ShieldCheck, 
  ShieldAlert,
  CreditCard,
  LogOut
} from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboard';
import { SettingsModal } from './SettingsModal';
import './Sidebar.css';

interface SidebarProps {
  activeTab: 'dashboard' | 'transactions' | 'insights';
  setActiveTab: (tab: 'dashboard' | 'transactions' | 'insights') => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { role } = useDashboardStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const menuItems = [
    { id: 'dashboard', label: 'Overview Hub', icon: LayoutDashboard },
    { id: 'transactions', label: 'Cash Log', icon: ReceiptText },
    { id: 'insights', label: 'Intelligence', icon: BarChart3 },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-logo">
          <CreditCard size={20} />
        </div>
        <div className="brand-info">
          <span className="brand-name">Zorvyn</span>
          <span className="brand-tag">FinOps v2.1</span>
        </div>
      </div>

      <div className="sidebar-role">
        <div className={`role-pill ${role.toLowerCase()}`}>
          {role === 'ADMIN' ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
          <span>{role === 'ADMIN' ? 'Power User' : 'Standard View'}</span>
        </div>
      </div>

      <div className="sidebar-section-label">Main Navigation</div>
      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`menu-button ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id as any)}
          >
            <item.icon size={18} />
            <span>{item.label}</span>
            {activeTab === item.id && <div className="active-dot" />}
          </button>
        ))}
      </nav>

      <div className="sidebar-section-label">System</div>
      <div className="sidebar-menu">
        <button className="menu-button" onClick={() => setIsSettingsOpen(true)}>
          <Settings size={18} />
          <span>Settings</span>
        </button>
        <button className="menu-button logout">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="sidebar-user-preview">
        <div className="preview-avatar">SG</div>
        <div className="preview-info">
          <span className="preview-name">Sunder G</span>
          <span className="preview-tier">Premium Plan</span>
        </div>
      </div>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </aside>
  );
};
