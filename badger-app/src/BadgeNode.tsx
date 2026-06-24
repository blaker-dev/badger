import React, { useMemo } from 'react';

interface BadgeNodeProps {
    key: number;
    title: string;
    url: string;
    isCompleted: boolean;
    shape: string;
    rotation: string;
}

export const BadgeNode: React.FC<BadgeNodeProps> = ({ title, url, isCompleted, shape, rotation }) => {

    return (
        <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: isCompleted ? '#A8D5BA' : '#FAFAF8',
            backgroundImage: isCompleted ? 'none' : `
                linear-gradient(90deg, transparent 20px, #ffb3b3 20px, #ffb3b3 22px, transparent 22px),
                repeating-linear-gradient(0deg, transparent, transparent 29px, #b3d9ff 29px, #b3d9ff 30px)
            `,
            clipPath: shape,
            filter: 'drop-shadow(2px 4px 4px rgba(0,0,0,0.2))',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            padding: '10px 10px 10px 25px', 
            transform: rotation
        }}>
            <span style={{ 
                fontFamily: 'Verdana, sans-serif', 
                fontSize: '12px', 
                fontWeight: 'bold',
                color: '#333',
                lineHeight: '30px'
            }}>
            </span>
        </div>
    );
};