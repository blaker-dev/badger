import React, { useState } from 'react';
import { DrawingCanvas } from './DrawingCanvas';

interface AddBadgeModalProps {
  onClose: () => void;
  onSave: (newBadge: { title: string; text: string; drawing: string; isBadge: boolean }) => void;
}

export const AddBadgeModal: React.FC<AddBadgeModalProps> = ({ onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [drawing, setDrawing] = useState('');
  const [text, setText] = useState('');
  const [isBadge, setIsBadge] = useState(true);

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
        
        <label style={{ display: 'block', marginBottom: '20px' }}>
          <input type="checkbox" checked={isBadge} onChange={(e) => setIsBadge(e.target.checked)} />
          Make this a Badge (Uncheck for Paper)
        </label>

        <button type="button" onClick={onClose}>Cancel</button>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};