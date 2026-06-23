// BottomNav.tsx
import React, { useState } from 'react';
import './stylesheets/navbar.css';

interface NavbarProps {
  onAddClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onAddClick }) => {
  const [activeTab, setActiveTab] = useState<string>('Home');

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
        onClick={() => setActiveTab('Home')}
      >
        Home
      </button>
      
      <button 
        className={`nav-item ${activeTab === 'Add Badge' ? 'active' : ''}`}
        onClick={() => {
          setActiveTab('Add Badge');
          onAddClick(); 
        }}
      >
        Add Badge
      </button>

      <button 
        className={`nav-item ${activeTab === 'Profile' ? 'active' : ''}`}
        onClick={() => setActiveTab('Profile')}
      >
        Profile
      </button>
      
    </nav>
  );
};