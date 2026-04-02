import React from 'react';
import { X, User, Bell, Shield, Palette } from 'lucide-react';
import './SettingsModal.css';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div className="header-info">
            <Palette size={20} className="header-icon" />
            <div>
              <h3>Dashboard Preferences</h3>
              <p>Tailor your financial workspace experience</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}><X size={20} /></button>
        </div>

        <div className="modal-content">
          <section className="settings-section">
            <h4><User size={16} /> Personal Account</h4>
            <div className="settings-row">
              <div className="row-label">
                <span>Display Name</span>
                <p>Visible across the Zorvyn ecosystem</p>
              </div>
              <input type="text" defaultValue="Sunder G" className="settings-input" />
            </div>
            <div className="settings-row">
              <div className="row-label">
                <span>Primary Currency</span>
              </div>
              <select className="settings-select">
                <option>USD ($)</option>
                <option>INR (₹)</option>
                <option>EUR (€)</option>
              </select>
            </div>
          </section>

          <section className="settings-section">
            <h4><Bell size={16} /> Notifications</h4>
            <div className="settings-toggle-row">
              <span>Alert me for large transactions (over $1,000)</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
            <div className="settings-toggle-row">
              <span>Weekly spending summaries</span>
              <label className="switch">
                <input type="checkbox" defaultChecked />
                <span className="slider round"></span>
              </label>
            </div>
          </section>

          <section className="settings-section">
            <h4><Shield size={16} /> Security</h4>
            <div className="settings-row">
              <div className="row-label">
                <span>Two-Factor Authentication</span>
              </div>
              <button className="secondary-btn">Enable 2FA</button>
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <button className="outline-btn" onClick={onClose}>Cancel</button>
          <button className="primary-btn" onClick={() => {
            alert('Settings saved! Applying profile changes...');
            onClose();
          }}>Save Changes</button>
        </div>
      </div>
    </div>
  );
};
