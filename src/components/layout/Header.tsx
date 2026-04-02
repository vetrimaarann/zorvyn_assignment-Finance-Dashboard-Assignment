import React from 'react';
import { Search, Bell, Sun, Moon, LayoutGrid } from 'lucide-react';
import { useDashboardStore } from '../../store/useDashboard';
import './Header.css';

export const Header: React.FC = () => {
  const { role, setRole } = useDashboardStore();

  return (
    <header className="main-header">
      <div className="header-search">
        <div className="search-pill">
          <Search size={16} className="search-icon" />
          <input type="text" placeholder="Jump to command or log..." />
          <kbd className="search-kbd">⌘K</kbd>
        </div>
      </div>

      <div className="header-tools">
        <div className="role-switcher">
          <span className="switcher-label">View:</span>
          <button 
            className={`switch-btn ${role === 'VIEWER' ? 'active' : ''}`}
            onClick={() => setRole('VIEWER')}
          >
            Viewer
          </button>
          <button 
            className={`switch-btn ${role === 'ADMIN' ? 'active' : ''}`}
            onClick={() => setRole('ADMIN')}
          >
            Admin
          </button>
        </div>

        <div className="vertical-divider" />

        <button className="tool-icon-btn">
          <Bell size={18} />
          <span className="notif-badge" />
        </button>

        <button className="tool-icon-btn profile-trigger">
          <div className="profile-pill">
            <LayoutGrid size={16} />
            <span>Workspace</span>
          </div>
        </button>
      </div>
    </header>
  );
};
