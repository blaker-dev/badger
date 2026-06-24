import React from 'react';
import './stylesheets/paper.css';

interface BadgeNodeProps {
    key: number; // Note: 'key' is a reserved React prop, you generally don't type it in the interface!
    title: string;
    url: string;
    isCompleted: boolean;
    shape: string; 
    rotation: string; 
}

export const BadgeNode: React.FC<BadgeNodeProps> = ({ title, url, isCompleted, shape, rotation }) => {
    
    return (
        <div 
            className="badge-wrapper" 
            style={{ transform: rotation }}
        >
            <div 
                className={`badge-inner ${isCompleted ? 'badge-completed' : 'badge-incomplete'}`}
                style={{ clipPath: shape }} 
            >
                <span className="badge-text">
                </span>
            </div>
        </div>
    );
};