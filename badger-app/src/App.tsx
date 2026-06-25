import React from 'react';
import { useState } from 'react';
import { BoardManager } from './BoardManager.tsx';
import { Navbar } from './Navbar.tsx';
import { Home } from './Home.tsx'

export const App: React.FC = () => {
  const [scene, setScene] = useState('Home');

  return (
    <div className="cork-canvas">

      { (scene == "Home") ?
        <div className="home">
          <Home/>
        </div>
        :
        <div> 
          <BoardManager/>
        </div>
      }

      <Navbar setScene={setScene}/>
    </div>
  );
};