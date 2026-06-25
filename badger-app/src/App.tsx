import React from 'react';
import { useState } from 'react';
import { PaperManager } from './PaperManager.tsx';
import { Navbar } from './Navbar.tsx';
import { Home } from './Home.tsx'

export const App: React.FC = () => {
  const [scene, setScene] = useState('Home');
  const [boardID, setBoardID] = useState(0);
  // IMPORTANT: have to get the board id on click here
  //            then pass that to the PaperManager
  

  return (
    <div className="cork-canvas">

      {(() => {
        switch (scene) {
          case 'Home':
            return <Home scene={scene} setScene={setScene} setBoardID={setBoardID}/>
          case 'Board':
            return <PaperManager boardID={boardID}/>}
      })()} 

      <Navbar scene={scene} setScene={setScene}/>
    </div>
  );
};