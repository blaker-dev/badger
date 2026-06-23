import React, { useState, useEffect } from 'react';
import { DndContext, type DragEndEvent, type DragStartEvent } from '@dnd-kit/core';
import { PaperNode } from './PaperNode';
import { BadgeNode } from './BadgeNode';
import { DraggableItem } from './DraggableItem';
import { Navbar } from './Navbar';
import { AddBadgeModal } from './AddBadgeModal';

interface BadgeData {
  id: number;
  title: string;
  text: string;       
  isBadge: boolean;
  isCompleted: boolean;
  x: number;  
  y: number;      
  zIndex: number; 
}

export const PaperManager: React.FC = () => {
    const [badges, setBadges] = useState<BadgeData[]>([]);
    const [maxZIndex, setMaxZIndex] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSaveNewBadge = async (newBadgeData: { title: string; text: string; isBadge: boolean }) => {
        try {
        const completeBadge = {
            ...newBadgeData,
            isCompleted: false,
            x: window.innerWidth / 2 - 100, // Center X
            y: window.innerHeight / 2 - 100, // Center Y
            zIndex: maxZIndex + 1
        };

        const response = await fetch('http://localhost:3001/api/badges', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(completeBadge)
        });

        // If the server connects but returns a bad status (like 500), throw an error
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const savedBadge = await response.json();

        setBadges([...badges, savedBadge]);
        setMaxZIndex(savedBadge.zIndex);
        setIsModalOpen(false); // Closes the modal on success!
    } catch (error) {
        console.error("Failed to save badge:", error);
        alert("Could not connect to the database. Is your backend server running?");
    }
    };  

    useEffect(() => {
        const abortController = new AbortController();

        const fetchBadges = async () => {
            try {
                const data = await fetch('http://localhost:3001/api/badges', {
                    signal: abortController.signal
                });

                if (!data.ok) {
                    throw new Error(`HTTP error! Status: ${data.status}`);
                }

                const result: BadgeData[] = await data.json();

                setBadges(result);
                setMaxZIndex(2);
            } catch
            {
                const mockData: BadgeData[] = [
                    {id: 1, title: "Japan", text: "N/A", isBadge: true, isCompleted: false, x: 75, y: 25, zIndex: 1},
                    {id: 2, title: "Japan-Trip", text: "boys trip to japan", isBadge: false, isCompleted: false, x: 120, y: 250, zIndex: 2}
                ];
                
                 setBadges(mockData);
                setMaxZIndex(2);
            }
        };
        fetchBadges();
    }, []);

    const handleDragStart = (event: DragStartEvent) => {
        const newZIndex = maxZIndex + 1;
        setMaxZIndex(newZIndex);
        
        setBadges((items) => items.map(item => 
            item.id === event.active.id ? { ...item, zIndex: newZIndex } : item
        ));
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;

        setBadges((items) => 
            items.map((item) => {
                if (item.id === active.id) {
                    return {
                        ...item,
                        x: item.x + delta.x,
                        y: item.y + delta.y,
                    };
                }
                return item;
            })
        );
    };

    return (
        <>
            <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="gallery-container" style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    {badges.map((item) => (
                        <DraggableItem 
                            key={item.id} 
                            id={item.id}
                            x={item.x}
                            y={item.y}
                            zIndex={item.zIndex}
                        >
                            {item.isBadge ? (
                                <BadgeNode title={item.title} url={item.text} isCompleted={item.isCompleted} />
                            ) : (
                                <PaperNode title={item.title} text={item.text} />
                            )}
                        </DraggableItem>
                    ))}
                </div>
            </DndContext>

            {isModalOpen && (
                <AddBadgeModal 
                    onClose={() => setIsModalOpen(false)} 
                    onSave={handleSaveNewBadge} 
                />
            )}

            <Navbar onAddClick={() => setIsModalOpen(true)}/>
        </>
    );
};