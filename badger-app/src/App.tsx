import React from 'react';
import { CorkNoise } from './CorkNoise';
import { PaperManager } from './PaperManager';

export const App: React.FC = () => {
  return (
    <div className="canvas">
      <CorkNoise/>

      <PaperManager/>
    </div>
  );
};