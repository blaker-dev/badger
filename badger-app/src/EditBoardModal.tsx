import React, { useState } from 'react';
import { type BoardProp } from './libs/boardInfo.ts';

interface EditBoardModalProps{
    boardData: BoardProp;
    onClose: () => void;
    onSave: (newBadge: { title: string; desc: string }) => void;
}

export const EditBoardModal: React.FC<EditBoardModalProps> = ({ boardData, onClose, onSave }) => {
    const [title, setTitle] = useState(boardData.title);
    const [desc, setDesc] = useState(boardData.desc || '');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({title, desc});
        onClose();
    };

    return (
        <div onClick={onClose} style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000,
            display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <form 
                onSubmit={handleSubmit} 
                onClick={(e) => e.stopPropagation()}
                style={{
                    backgroundColor: '#FAFAF8', padding: '30px', borderRadius: '15px', width: '300px'
                }}
            >
                <h2>Edit Board?</h2>
                
                <input 
                    placeholder="Title" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />

                <input 
                    placeholder="Description" 
                    value={desc} 
                    onChange={(e) => setDesc(e.target.value)} 
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />

                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};