import React from 'react';
import { CgProfile } from 'react-icons/cg';

import './ProfileSummary.css';

const ProfileSummary = ({ avatar, name, desc }) => {
  console.log('ProfileSummary: ', name);
  return (
    <div className="profile-summary">
      <div className="profile-summary__img">
        {avatar ? (
          <img src={`data:image/jpeg;base64,${avatar.buffer.data}`} />
        ) : (
          <CgProfile />
        )}
      </div>
      <div className="profile-summary__text">
        <h4>{name || 'no name'}</h4>
        <p>{desc || 'no desc'}</p>
      </div>
    </div>
  );
};

export default ProfileSummary;
