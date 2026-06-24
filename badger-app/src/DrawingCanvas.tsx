import React, { useState, useRef } from 'react';
import { type Point, getSvgPathFromStroke } from './libs/drawingUtils.ts'

interface DrawingCanvasProps {
  setDrawing: (value: string) => void; // string function (effectively passes data up to the parent)
}

export const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ setDrawing }) => {
  const [lines, setLines] = useState<Point[][]>([]);
  const [currentLine, setCurrentLine] = useState<Point[]>([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const handlePointerDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setCurrentLine([{ x, y }]);
  };

  const handlePointerMove = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!isDrawing || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCurrentLine((prev) => [...prev, { x, y }]);
  };

  const handlePointerUp = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    if (currentLine.length > 0) {
      const newLinesArray = [...lines, currentLine]
      setDrawing(JSON.stringify(newLinesArray));
      setLines((prev) => [...prev, currentLine]);
      setCurrentLine([]);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg
        ref={svgRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
        style={{
          width: '200px',
          height: '200px',
          backgroundColor: '#FAFAF8',
          border: '2px dashed #ccc',
          borderRadius: '50%',
          touchAction: 'none'
        }}
      >
        {/* Render all completed lines */}
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
        {/* Render line currently being drawn */}
        {currentLine.length > 0 && (
          <path
            d={getSvgPathFromStroke(currentLine)}
            stroke="#333"
            strokeWidth={3}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
      <button 
        onClick={() => { setLines([]); setCurrentLine([]); }}
        style={{ marginTop: '10px' }}
      >
        Clear Drawing
      </button>
    </div>
  );
};