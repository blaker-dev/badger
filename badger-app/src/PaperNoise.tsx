import React from 'react';
import './stylesheets/paper.css'

export const FabricNoise: React.FC = () => {
  return (
    <div className="fabric">
        <svg width="100%" height="100%">
            <defs>
                <filter id="noiseFilter">
                    <feTurbulence 
                        type="fractalNoise" 
                        baseFrequency="0.8 0.2" 
                        numOctaves="3" 
                        stitchTiles="stitch" 
                    />
                </filter>
            </defs>
            <rect width="100%" height="100%" filter="url(#noiseFilter)" />
        </svg>
    </div>
  );
};