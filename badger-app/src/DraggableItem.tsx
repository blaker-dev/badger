import React from 'react';
import { useDraggable } from '@dnd-kit/core';

interface DraggableItemProps {
  id: number;
  x: number;
  y: number;
  zIndex: number;
  children: React.ReactNode;
}

export const DraggableItem = ({ id, x, y, zIndex, children }: DraggableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const currentX = x + (transform?.x ?? 0);
  const currentY = y + (transform?.y ?? 0);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${currentX}px`,
    top: `${currentY}px`,
    zIndex: transform ? 999 : zIndex, 
    cursor: transform ? 'grabbing' : 'grab',
    
    // IMPORTANT: since underlaying cork is styled with SVG this renders seperately
    //            greatly reducing lag while movig
    willChange: isDragging ? 'transform, opacity' : 'auto',
    
    opacity: isDragging ? 0.9 : 1,
    transform: isDragging ? 'scale(1.02)' : 'scale(1)', 
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <div style={{ pointerEvents: isDragging ? 'none' : 'auto' }}>
        {children}
      </div>
    </div>
  );
};