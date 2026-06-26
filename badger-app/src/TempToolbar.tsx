import React from 'react';

interface TempToolbarProps {
    badgeId: number;
    onEdit: () => void;
    onDelete: (id: number) => Promise<void>;
}

export const TempToolbar: React.FC<TempToolbarProps> = ({ badgeId, onEdit , onDelete }) => {
    
    const containerStyle: React.CSSProperties = {
        position: 'absolute',
        bottom: '-55px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        display: 'flex',
        gap: '12px',
        backgroundColor: '#F4F4F0',
        padding: '6px 16px',
        borderRadius: '6px',
        boxShadow: '4px 4px 0px rgba(0, 0, 0, 0.15)',
        whiteSpace: 'nowrap',
    };

    const buttonStyle: React.CSSProperties = {
        background: 'transparent',
        border: 'none',
        cursor: 'pointer',
        fontWeight: 'bold',
        color: '#444',
        padding: '4px 8px',
        fontFamily: 'inherit',
        textDecoration: 'underline',
        textDecorationStyle: 'wavy',
        textUnderlineOffset: '4px',
        fontSize: '0.9rem'
    };

    return (
        <div style={containerStyle}>
            <button 
                style={buttonStyle}
                onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                }}>
                Edit
            </button>
            <button 
                style={{ ...buttonStyle, color: '#d9534f' }} 
                onClick={() => { onDelete(badgeId) }}
            >
                Delete
            </button>
        </div>
    );
};