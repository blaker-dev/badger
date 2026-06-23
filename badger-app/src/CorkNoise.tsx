import React from 'react';
import './stylesheets/cork.css'

export const CorkNoise: React.FC = () => {
    return (
        <div className="cork">
            <svg width="100%" height="100%">
                <filter id="cork-texture">
                    <feTurbulence 
                        type="fractalNoise" 
                        baseFrequency="0.7" 
                        numOctaves="4" 
                        stitchTiles="stitch" 
                    />
                </filter>
                <rect width="100%" height="100%" filter="url(#cork-texture)" />
            </svg>
        </div>
    );
};