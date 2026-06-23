import React from 'react';
import './stylesheets/paper.css'

interface BadgeNode {
  title: string;
  url: string;
  isCompleted: boolean;
}

export const BadgeNode: React.FC<BadgeNode> = ({url}) => {
  return (
    <div className="base-node node-badge">
        <img src={url}></img>
    </div>
  );
};