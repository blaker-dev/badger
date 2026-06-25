import React, { useState, useEffect } from 'react';
import { 
    DndContext, 
    PointerSensor, 
    useSensor, 
    useSensors, 
    type DragEndEvent, 
    type DragStartEvent 
} from '@dnd-kit/core';
import { PaperNode } from './PaperNode';
import { BadgeNode } from './BadgeNode';
import { DraggableItem } from './DraggableItem';
import { Toolbar } from './Toolbar';
import { AddBadgeModal } from './AddBadgeModal';

interface BadgeData {
    id: number;
    title: string;
    text: string;       
    drawing: string;
    isBadge: boolean;
    isCompleted: boolean;
    x: number;  
    y: number;      
    zIndex: number; 
    shape: string;
    rotation: string;
}

export const PaperManager: React.FC = () => {
    const [badges, setBadges] = useState<BadgeData[]>([]);
    const [maxZIndex, setMaxZIndex] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBadgeId, setSelectedBadgeId] = useState<number | null>(null);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 5, 
            },
        })
    );

    const generateRippedEdge = () => {
        const points = [];
        const numPoints = 35;
        const variance = 6;
        for (let i = 0; i < numPoints; i++) {
            const angle = (i / numPoints) * Math.PI * 2;
            const r = 50 - (Math.random() * variance);
            const x = 50 + (r * Math.cos(angle));
            const y = 50 + (r * Math.sin(angle));
            points.push(`${x.toFixed(1)}% ${y.toFixed(1)}%`);
        }
        return `polygon(${points.join(', ')})`;
    };

    const handleSaveNewBadge = async (newBadgeData: { title: string; text: string; drawing: string, isBadge: boolean }) => {
        try {
            const completeBadge = {
                ...newBadgeData,
                isCompleted: false,
                x: window.innerWidth / 2 - 100,
                y: window.innerHeight / 2 - 100,
                zIndex: maxZIndex + 1,
                shape: newBadgeData.isBadge ? generateRippedEdge() : '',
                rotation: `rotate(${(Math.random() * 8) - 4}deg)`
            };

            const response = await fetch('http://localhost:3001/api/badges', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(completeBadge)
            });

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

    const handleDeleteBadge = async (id: number) => {
        try {
            await fetch(`http://localhost:3001/api/badges/${id}`, {
                method: 'DELETE',
            });
            
            setBadges((prevBadges) => prevBadges.filter((badge) => badge.id !== id));
            
            setSelectedBadgeId(null);
        } catch (error) {
            alert('Failed to delete badge. Is the backend running?');
        }
    };
    
    const updateBadgePositionInDB = async (id: number, x: number, y: number, zIndex: number) => {
        try {
            await fetch(`http://localhost:3001/api/badges/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ x, y, zIndex })
            });
        } catch (error) {
            console.error("Failed to save position to database:", error);
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
                // do nothing ig??
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

        const activeItem = badges.find(b => b.id === event.active.id);
        if (activeItem) {
            updateBadgePositionInDB(activeItem.id, activeItem.x, activeItem.y, newZIndex);
        }
    };

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, delta } = event;

        const activeItem = badges.find(b => b.id === active.id);
        if (!activeItem) return;

        const newX = activeItem.x + delta.x;
        const newY = activeItem.y + delta.y;

        setBadges((items) => 
            items.map((item) => {
                if (item.id === active.id) {
                    return { ...item, x: newX, y: newY };
                }
                return item;
            })
        );

        updateBadgePositionInDB(activeItem.id, newX, newY, activeItem.zIndex);
    };

    return (
        <>
            <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
                <div className="gallery-container" onClick={() => setSelectedBadgeId(null)} style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
                    {badges.map((item) => (
    <DraggableItem 
        key={item.id} 
        id={item.id} 
        x={item.x} 
        y={item.y} 
        zIndex={item.zIndex}
    >
        <div 
            onClick={(e) => {
            e.stopPropagation();
            setSelectedBadgeId(item.id);
        }} 
        style={{ position: 'relative' }}
        >
            {item.isBadge ? (
                <BadgeNode 
                    key={item.id} 
                    title={item.title} 
                    drawing={item.drawing}
                    isCompleted={item.isCompleted}
                    shape={item.shape}
                    rotation={item.rotation}
                />
            ) : (
                <PaperNode 
                    key={item.id} 
                    title={item.title} 
                    text={item.text} 
                />
            )}

            {selectedBadgeId === item.id && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteBadge(item.id);
                    }}
                    style={{
                        position: 'absolute',
                        right: '-50px',
                        top: '10px',
                        background: '#ff4d4d',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '35px',
                        height: '35px',
                        cursor: 'pointer',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '18px'
                    }}
                >
                    🗑️
                </button>
            )}
        </div>
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

            <Toolbar onAddClick={() => setIsModalOpen(true)}/>
        </>
    );
};