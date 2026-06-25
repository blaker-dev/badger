import React from 'react';
import { useState } from 'react';
import { BoardManager } from './BoardManager.tsx';
import { Navbar } from './Navbar.tsx';
import { Home } from './Home.tsx'

export const App: React.FC = () => {
  const [scene, setScene] = useState('Home');

  return (
    <div className="cork-canvas">

      {(() => {
        switch (scene) {
          case 'Home':
            return <Home setScene={setScene}/>
          case 'Board':
            return <BoardManager scene={scene}/>}
      })()} 

      <Navbar setScene={setScene}/>
    </div>
  );
};