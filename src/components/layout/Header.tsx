import React from 'react';
import { Search, Bell, UserCircle2, ChevronDown } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboard';
import { ThemeToggle } from './ThemeToggle';
import './Header.css';

export const Header: React.FC = () => {
  const { role, setRole } = useDashboardStore();

  return (
    <header className="header">
      <div className="header-search">
        <Search size={18} className="search-icon" />
        <input type="text" placeholder="Search transactions, insights..." />
      </div>

      <div className="header-actions">
        {/* Role Switcher - Demo Feature */}
        <div className="role-switcher">
          <label htmlFor="role-select">Access level</label>
          <select 
            id="role-select" 
            value={role} 
            onChange={(e) => setRole(e.target.value as any)}
            className={`role-select ${role === 'ADMIN' ? 'admin' : 'viewer'}`}
          >
            <option value="ADMIN">Admin Mod</option>
            <option value="VIEWER">Viewer Only</option>
          </select>
        </div>

        <ThemeToggle />

        <button className="action-btn">
          <Bell size={20} />
          <span className="notification-dot"></span>
        </button>

        <div className="user-profile">
          <div className="user-avatar">
            <UserCircle2 size={24} />
          </div>
          <div className="user-info">
            <span className="user-name">Sunder G</span>
            <span className="user-role">{role === 'ADMIN' ? 'Administrator' : 'Financial Analyst'}</span>
          </div>
          <ChevronDown size={14} className="chevron" />
        </div>
      </div>
    </header>
  );
};
