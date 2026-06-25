import React from 'react';
import './stylesheets/navbar.css';

interface NavbarProps {
  scene: string;
  setScene: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ scene, setScene }) => {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-item ${scene === 'Home' ? 'active' : ''}`}
        onClick={() => setScene('Home')}
      >
        Home
      </button>

      <button 
        className={`nav-item ${scene === 'Profile' ? 'active' : ''}`}
        onClick={() => setScene('Profile')}
      >
        Profile
      </button>
    </nav>
  );
};