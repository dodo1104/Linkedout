import React from 'react';
import { CgProfile } from 'react-icons/cg';

import moment from 'moment';

import './Comment.css';

const Comment = ({ comment }) => {
  const { date, profile, text } = comment;
  const { data: bufferData = null } = profile.avatar.buffer;

  const formatDate = moment(date).format('YYYY-MM-DD HH:MM');

  console.log('comment:\n', comment);
  return (
    <div className="comment info-box">
      <div className="comment__img">
        {
          // bufferData != null ? (
          //   <img
          //     src={`data:${profile.avatar.mimetype};base64,${convertToBase64(
          //       bufferData
          //     )}`}
          //   />
          // ) :
          <CgProfile />
        }
      </div>

      <div className="comment__info">
        <p className="comment__info__name fs-400 fw-600">{profile.name}</p>
        <p className="comment__info__desc fs-300 color-gray-light">
          {profile.desc ? profile.desc : 'description to check'}
        </p>
        {/* <p className="comment__info__date fs-300 color-gray-medium">
          {formatDate}
        </p> */}
        <p className="comment__info__text fs-400">{text}</p>
      </div>
    </div>
  );
};

const convertToBase64 = (buffer) => {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
};

export default Comment;
