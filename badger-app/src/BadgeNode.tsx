import React from 'react';

interface BadgeNodeProps {
    id: number;
    title: string;
    url: string;
    isCompleted: boolean;
    shape: string; 
    rotation: string; 
}

export const BadgeNode: React.FC<BadgeNodeProps> = ({ title, url, isCompleted, shape, rotation }) => {
    
    return (
        <div style={{
            filter: 'drop-shadow(3px 4px 1px rgba(0, 0, 0, 0.4))',
            transform: rotation,
            width: '120px',
            height: '120px'
        }}>
            <div style={{
                width: '100%',
                height: '100%',
                backgroundColor: isCompleted ? '#A8D5BA' : '#FAFAF8',
                backgroundImage: isCompleted ? 'none' : `
                    linear-gradient(90deg, transparent 20px, #ffb3b3 20px, #ffb3b3 22px, transparent 22px),
                    repeating-linear-gradient(0deg, transparent, transparent 29px, #b3d9ff 29px, #b3d9ff 30px)
                `,
                clipPath: shape, 
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '10px 10px 10px 25px',
                boxSizing: 'border-box' 
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
        </div>
    );
};