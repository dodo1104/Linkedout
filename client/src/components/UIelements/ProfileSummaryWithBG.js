import React from 'react';
import { CgProfile } from 'react-icons/cg';

import './ProfileSummaryWithBG.css';

const ProfileSummaryWithBG = ({
  avatar,
  name,
  desc,
  bgImage = 'https://www.citybridgetrust.org.uk/assets/images/_stdXl/Tower-Bridge-City-Bridge-Trust.png?v=1673974146'
}) => {
  return (
    <div className="profile-summary-with-bg">
      <div className="profile-summary-with-bg__images">
        {bgImage && (
          <img
            className="profile-summary-with-bg__images__bg"
            src={`${bgImage}`}
          />
          // <img
          //   className="profile-summary-with-bg__images__bg"
          //   src={`data:image/jpeg;base64,${avatar.buffer.data}`}
          // />
        )}
        {avatar ? (
          <img
            className="profile-summary-with-bg__images__avatar"
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"
          />
        ) : (
          // <img
          //   className="profile-summary-with-bg__images__avatar"
          //   src={`data:image/jpeg;base64,${avatar.buffer.data}`}
          // />
          <CgProfile className="profile-summary-with-bg__images__avatar" />
        )}
      </div>
      <div className="profile-summary-with-bg__text">
        <h4>{name || 'no name'}</h4>
        <p>{desc || 'description'}</p>
      </div>
    </div>
  );
};

export default ProfileSummaryWithBG;
