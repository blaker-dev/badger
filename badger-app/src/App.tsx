import React from 'react';
import { FabricNoise } from './FabricNoise';

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

      {/* The "Piece of Paper" Card */}
      <div style={{
        backgroundColor: '#FAFAF8',
        padding: '50px',
        
        transform: 'rotate(-1.5deg)',
        
        borderRadius: '2px 4px 2px 3px',
        
        /* The first shadow is the hard, thin edge of the paper.
           The second shadow is the softer ambient light. */
        boxShadow: '5px 5px 3px rgba(0, 0, 0, 0.1), 4px 8px 15px rgba(0, 0, 0, 0.05)',
        
        border: '1px solid #EAE8E3',
        
        position: 'relative', 
        zIndex: 10            
      }}>
        <h1 style={{ color: '#4A443D', margin: '0 0 10px 0' }}>My Bucket List</h1>
        <p style={{ color: '#8C857B', margin: 0 }}>Now this feels like a real scrapbook.</p>
      </div>

    </div>
  );
};