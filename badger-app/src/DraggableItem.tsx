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
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id });

  const currentX = x + (transform?.x ?? 0);
  const currentY = y + (transform?.y ?? 0);

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${currentX}px`,
    top: `${currentY}px`,
    zIndex: transform ? 999 : zIndex, 
    cursor: transform ? 'grabbing' : 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {children}
    </div>
  );
};