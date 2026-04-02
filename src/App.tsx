import React, { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { Transactions } from './components/transactions/Transactions';
import { Insights } from './components/dashboard/Insights';
import { useDashboardStore } from './store/useDashboard';
import { SettingsModal } from './components/layout/SettingsModal';
import './styles/variables.css';
import './App.css';

function App() {
  const { activeTab, setActiveTab } = useDashboardStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const renderContent = () => {
    switch (activeTab) {
      case 'Overview':
        return <Dashboard />;
      case 'Transactions':
        return <Transactions />;
      case 'Insights':
        return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app-container">
      <Sidebar 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onOpenSettings={() => setIsSettingsOpen(true)} 
      />
      <div className="main-content">
        <Header />
        <main className="content-area">
          {renderContent()}
        </main>
      </div>
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
}

export default App;
