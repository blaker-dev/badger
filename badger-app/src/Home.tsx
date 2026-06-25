import React from 'react';
import { useState, useEffect } from 'react';
import './stylesheets/home.css';
import { Toolbar } from './Toolbar';
import { AddBoardModal } from './AddBoardModal';

interface HomeProps {
    scene: string;
    setScene: (value: string) => void;
    setBoardID: (value: number) => void;
}

interface BoardProp {
    id: number,
    title: string,
    desc: string,
    image: string
}

interface NewBoardProps {
    title: string,
    desc: string,
    image: string
}

export const Home: React.FC<HomeProps> = ({ scene, setScene, setBoardID }) => {
    const [boards, setBoards] = useState<BoardProp[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const updateBoard = (message: string, id: number): void => {
        setScene(message);
        setBoardID(id);   
    }

    const addBoard = async ({ title, desc, image}: NewBoardProps): Promise<void> => {
        try {
            const payload = {
                title,
                desc,
                image
            };

            const response = await fetch('http://localhost:3001/api/boards', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const serverBoard = await response.json();

            const savedBoard: BoardProp = {
                id: serverBoard.id,
                title: serverBoard.title,
                desc: serverBoard.desc,
                image: serverBoard.image
            };

            setBoards([...boards, savedBoard]);

        } catch (error) {
            console.error("Failed to save new board:", error);
            alert("Could not save the board to the database. Is the backend running?");
        }
    };  

    useEffect(() => {
        const fetchBoards = async () => {
            try {
                const response = await fetch('http://localhost:3001/api/boards');
                if (!response.ok) throw new Error('Failed to fetch boards');
                
                const data = await response.json();
                
                setBoards(data);
            } catch (error) {
                console.error("Error loading boards:", error);
            }
        };

        if (scene === 'Home')
        {
            fetchBoards();
        }
    }, [scene, boards]);

    return (
        <div className="scrapbook-container">
            <header className="scrapbook-header">
                <h1 className="label-maker-title">MY BOARDS</h1>
            </header>
            
            <main className="scrapbook-scroll-area">
                <div className="polaroid-grid">
                    {boards.map((board) => (
                        <div key={board.id} className="polaroid-card" onClick={() => updateBoard('Board', board.id)}>
                            <div className="polaroid-image-placeholder">
                                {/* >> thumbnail or smth here << */}
                                <span>✧.*</span>
                            </div>
                            <div className="polaroid-text">
                                <h2>{board.title}</h2>
                                <p>{board.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {isModalOpen && (
                <AddBoardModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={(modalData) => { 
                        addBoard({
                            title: modalData.title,
                            desc: modalData.desc,
                            image: ''
                        });
                        
                        setIsModalOpen(false);
                    }} 
                />
            )}

            <Toolbar onAddClick={() => setIsModalOpen(true)}/>
        </div> 
    );
}


// TODO: add board deletion