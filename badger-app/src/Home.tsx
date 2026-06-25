import React from 'react';
import './stylesheets/home.css';

interface HomeProps {
    setScene: (value: string) => void;
    setBoardID: (value: number) => void;
}

export const Home: React.FC<HomeProps> = ({ setScene, setBoardID }) => {
    const testBoards = Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Vision Board ${i + 1}`,
        description: 'Websites, cool links, and Y2K inspo.',
    }));

    const updateBoard = (message: string, id: number): void => {
        setScene(message);
        setBoardID(id);   
    }

    return (
        <div className="scrapbook-container">
            <header className="scrapbook-header">
                <h1 className="label-maker-title">MY BOARDS</h1>
            </header>
            
            <main className="scrapbook-scroll-area">
                <div className="polaroid-grid">
                    {testBoards.map((board) => (
                        <div key={board.id} className="polaroid-card" onClick={() => updateBoard('Board', board.id)}>
                            <div className="polaroid-image-placeholder">
                                {/* >> thumbnail or smth here << */}
                                <span>✧.*</span>
                            </div>
                            <div className="polaroid-text">
                                <h2>{board.title}</h2>
                                <p>{board.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </div> 
    );
}