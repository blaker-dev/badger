import React from 'react';
import './stylesheets/paper.css'

interface PaperNode {
  title: string;
  text: string;
}

export const PaperNode: React.FC<PaperNode> = ({title, text}) => {
  return (
    <div className="base-node node-card">
      <h1 className="paper-title">{title}</h1>
      <p className="papertext">
        {text}
      </p>
    </div>
  );
};