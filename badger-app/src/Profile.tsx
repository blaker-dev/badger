import React from 'react';
import './stylesheets/profile.css';

export const Profile: React.FC = () => {
  return (
    <div className="profile-container">
      
      <h1 className="dymo-label main-title">MY_PROFILE</h1>

      <div className="polaroid-wrapper">
        <div className="polaroid-card">
          <div className="polaroid-image">
            <span className="placeholder-text">Insert Face Here</span>
          </div>
          <div className="polaroid-caption">Me in 2026!</div>
        </div>
      </div>

      <div className="bio-paper taped-element">
        <h2 className="dymo-label bio-title">ABOUT_ME</h2>
        <p className="handwritten-text">
          Just trying to cross off my bucket list one day at a time! 
          Always looking for the next big adventure.
        </p>
      </div>

      <div className="sticky-note">
        <h2 className="dymo-label stats-title">STATS</h2>
        <ul className="handwritten-text">
          <li>Boards Joined: 3</li>
          <li>Badges Earned: 12</li>
          <li>Friends: 8</li>
        </ul>
      </div>

    </div>
  );
};