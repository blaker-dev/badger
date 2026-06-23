import React from 'react';
import { FabricNoise } from './FabricNoise';
import { PaperManager } from './PaperManager';

export const App: React.FC = () => {
  return (
    <div style={{ 
      backgroundColor: '#FDF4DC', 
      minHeight: '100vh', 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'sans-serif',
      position: 'relative' 
    }}>
      
      <FabricNoise/>

      <PaperManager/>
    </div>
  );
};