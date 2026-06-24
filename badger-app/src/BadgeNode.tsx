import React from 'react';
import './stylesheets/paper.css';
import { type Point, getSvgPathFromStroke } from './libs/drawingUtils';

interface BadgeNodeProps {
    title: string;
    drawing: string; // json string drawing
   isCompleted: boolean;
    shape: string; 
    rotation: string; 
}

export const BadgeNode: React.FC<BadgeNodeProps> = ({ drawing, isCompleted, shape, rotation }) => { 
    let lines: Point[][] = [];
    try {
        if (drawing) {
            lines = JSON.parse(drawing);
        }
    } catch (error) {
        console.error("Failed to parse drawing data", error);
    }

    return (
        <div 
            className="badge-wrapper" 
            style={{ transform: rotation }}
        >
            <div 
                className={`badge-inner ${isCompleted ? 'badge-completed' : 'badge-incomplete'}`}
                style={{ clipPath: shape }} 
            >
                <span className="badge-image">
                    {/** Use SVG drawing to render image according to json instructions */} 
                    <svg>
                        {lines.map((line, index) => (
                            <path
                                key={index}
                                d={getSvgPathFromStroke(line)}
                                stroke="#333"
                                strokeWidth={3}
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        ))}
                    </svg> 
                </span>
            </div>
        </div>
    );
};