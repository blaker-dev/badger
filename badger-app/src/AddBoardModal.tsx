import React from 'react';
import { useState } from 'react';

interface AddBoardModalProps {
  onClose: () => void;
  onSave: (newBoard: { title: string; desc: string, image: string }) => void;
}

export const AddBoardModal: React.FC<AddBoardModalProps> = ({ onClose, onSave }) => {
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [image, setImage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, desc, image });
    };

    return (
        <div style={{
        position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
        backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 10000,
        display: 'flex', justifyContent: 'center', alignItems: 'center'
        }}>
            <form onSubmit={handleSubmit} style={{
                backgroundColor: '#FAFAF8', padding: '30px', borderRadius: '15px', width: '300px'
            }}>
                <h2>Add to Bucket List</h2>
                
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

                <input 
                    placeholder="Thumbnail Image (leave blank for placeholder)" 
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />

                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};