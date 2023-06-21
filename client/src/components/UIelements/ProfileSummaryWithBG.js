import React, { useEffect, useState, useRef } from 'react';
import { BsPersonSquare } from 'react-icons/bs';

import './ProfileSummaryWithBG.css';

const ProfileSummaryWithBG = ({
  avatar,
  name,
  desc,
  bgImage = 'https://www.citybridgetrust.org.uk/assets/images/_stdXl/Tower-Bridge-City-Bridge-Trust.png?v=1673974146'
}) => {
  const [isAvatarLoaded, setIsAvatarLoaded] = useState(true);
  const [isBgLoaded, setIsBgLoaded] = useState(true);
  const avatarRef = useRef();
  const bgRef = useRef();

  // useEffect(() => {
  //   const avatarImg = document.querySelector("img[role='avatar']");
  //   const avatarBg = document.querySelector("img[role='background']");

  //   if (!avatarImg.complete || !avatarImg.naturalHeight)
  //     return setIsAvatarLoaded(false);
  //   if (!avatarBg.complete || !avatarBg.naturalHeight)
  //     return setIsBgLoaded(false);

  //   setIsAvatarLoaded(true);
  //   setIsBgLoaded(true);
  // }, [avatarRef, bgRef]);

  return (
    <div className="profile-summary-with-bg">
      <div className="profile-summary-with-bg__images">
        <img
          ref={bgRef}
          role="background"
          className={`profile-summary-with-bg__images__bg ${
            !isBgLoaded ? 'opc-0' : ''
          }`}
          src={`${bgImage}`}
        />

        {/* <img
            ref={avatarRef}
            role="avatar"
            className={`profile-summary-with-bg__images__avatar ${
              !isAvatarLoaded ? 'opc-0' : ''
            }`}
            src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"
          /> */}

        {/* // <img
          //   className="profile-summary-with-bg__images__avatar"
          //   src={`data:image/jpeg;base64,${avatar.buffer.data}`}
          // /> */}
        <BsPersonSquare className="profile-summary-with-bg__images__avatar profile-summary-with-bg__images__avatar--svg" />
      </div>
      <div className="profile-summary-with-bg__text">
        <h4>{name || 'no name'}</h4>
        <p>{desc || 'description'}</p>
      </div>
    </div>
  );
};

export default ProfileSummaryWithBG;
