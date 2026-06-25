// BottomNav.tsx
import React, { useState } from 'react';
import './stylesheets/navbar.css';

interface NavbarProps {
  setScene: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ setScene }) => {
  const [activeTab, setActiveTab] = useState<string>('Home');
  setScene('Home'); // Initialize at Home

  const updateScene = (scene: string): void => {
    setScene(scene);
    setActiveTab(scene);
  }

  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${activeTab === 'Home' ? 'active' : ''}`}
        onClick={() => updateScene('Home')}
      >
        Home
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