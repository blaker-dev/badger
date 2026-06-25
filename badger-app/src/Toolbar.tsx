// BottomNav.tsx
import React, { useState } from 'react';
import './stylesheets/toolbar.css';

interface ToolbarProps {
  onAddClick: () => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ onAddClick }) => {
  const [activeTab, setActiveTab] = useState<string>('Home');

  return (
    <nav className="tool-bar">
      <button 
        className={`tool-item ${activeTab === 'Add Badge' ? 'active' : ''}`}
        onClick={() => {
          setActiveTab('Add Badge');
          onAddClick(); 
        }}
      >
        +
      </button>
    </nav>
  );
};