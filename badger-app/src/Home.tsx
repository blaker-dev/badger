import React from 'react';
import { useState, useEffect } from 'react';
import { Toolbar } from './Toolbar';
import { AddBoardModal } from './AddBoardModal';
import { HomeToolbar } from './HomeToolbar.tsx';
import { EditBoardModal } from './EditBoardModal';


import './stylesheets/home.css';
import { type BoardProp } from './libs/boardInfo.ts';

interface HomeProps {
    scene: string;
    setScene: (value: string) => void;
    setBoardID: (value: number) => void;
}

interface NewBoardProps {
    title: string,
    desc: string,
    image: string
}

export const Home: React.FC<HomeProps> = ({ scene, setScene, setBoardID }) => {
    const [boards, setBoards] = useState<BoardProp[]>([]);
    
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const [currentBoard, setCurrentBoard] = useState(-1);

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
    }, [scene]);

    // delete boards on the homescreen
    const handleDeleteBoard = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/api/board/${id}`, {
                method: 'DELETE',
            });

            // TODO: also delete the badges that belong to each board
            
            setBoards((prevBoards) => prevBoards.filter((board) => board.id !== id));
            
            setCurrentBoard(-1);
        } catch (error) {
            alert('Failed to delete board. Is the backend running?');
        }
    };

    const handleUpdate = async (title: string, desc: string) => {
        try {
            // send info to backend
            await fetch(`http://localhost:3001/api/board/${currentBoard}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, desc})
            });
            
            // now edit local board - after success
            setBoards((prevBoards) =>
                prevBoards.map((board) => {
                    if (board.id === currentBoard) {
                        return {
                            ...board,
                            title: title,
                            desc: desc,
                        };
                    }
                    
                    return board;
                })
            );

        } catch (error) {
            alert('Failed to update board ' + error);
        }
    };

    return (
        <div className="scrapbook-container" onClick={() => setCurrentBoard(-1)}>
            <header className="scrapbook-header">
                <h1 className="label-maker-title">MY BOARDS</h1>
            </header>
            
            <main className="scrapbook-scroll-area">
                <div className="polaroid-grid">
                    {boards.map((board) => {
                        const isSelected = currentBoard === board.id;

                        return (
                            <div 
                                key={board.id} 
                                style={{ 
                                    position: 'relative', 
                                    marginBottom: isSelected ? '60px' : '0px', 
                                    transition: 'margin-bottom 0.2s ease'
                                }}
                                onClick={(e) => {e.stopPropagation()}}
                            > 
                                <div 
                                    className="polaroid-card" 
                                    onClick={(e) => {
                                        e.stopPropagation(); 
                                        setCurrentBoard(board.id);
                                    }}
                                >
                                    <div className="polaroid-image-placeholder">
                                        <span>✧.*</span>
                                    </div>
                                    <div className="polaroid-text">
                                        <h2>{board.title}</h2>
                                    </div>
                                    <p>{board.desc}</p>
                                </div>

                                { isSelected && (
                                    <HomeToolbar
                                        boardId={board.id}
                                        open={() => {updateBoard('Board', board.id)}}
                                        onEdit={() => {setEditModalOpen(true)}}
                                        onDelete={handleDeleteBoard}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>
            </main>

            {editModalOpen && (
                <EditBoardModal
                    boardData={boards.find(b => b.id === currentBoard)!}
                    onClose={() => {setEditModalOpen(false)}}
                    onSave={({ title, desc }) => handleUpdate(title, desc)}
                />
            )}

            {addModalOpen && (
                <AddBoardModal 
                    onClose={() => setAddModalOpen(false)} 
                    onSave={(modalData) => { 
                        addBoard({
                            title: modalData.title,
                            desc: modalData.desc,
                            image: ''
                        });
                        
                        setAddModalOpen(false);
                    }} 
                />
            )}

            <Toolbar onAddClick={() => setAddModalOpen(true)}/>
        </div> 
    );
}