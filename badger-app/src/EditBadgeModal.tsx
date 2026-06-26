import React, { useState } from 'react';
import { DrawingCanvas } from './DrawingCanvas';
import { type BadgeData } from './libs/badgeInfo';

interface EditBadgeModalProps{
    badgeData: BadgeData;
    onClose: () => void;
    onSave: (newBadge: { title: string; text: string; drawing: string; isBadge: boolean }) => void;
}


export const EditBadgeModal: React.FC<EditBadgeModalProps> = ({ badgeData, onClose, onSave }) => {
    const [title, setTitle] = useState(badgeData.title);
    const [drawing, setDrawing] = useState(badgeData.drawing || '');
    const [text, setText] = useState(badgeData.text || '');
    const { isBadge } = badgeData; // I don't need to change this boolen

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, text, drawing, isBadge });
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
                    placeholder="Title (e.g. Go Skydiving)" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                />

                {isBadge ? 
                    <DrawingCanvas setDrawing={setDrawing}/>
                    :  
                    <input 
                        placeholder="Description or Image URL" 
                        value={text} 
                        onChange={(e) => setText(e.target.value)} 
                        style={{ display: 'block', width: '100%', marginBottom: '10px' }}
                    />
                }

                <button type="button" onClick={onClose}>Cancel</button>
                <button type="submit">Save</button>
            </form>
        </div>
    );
};