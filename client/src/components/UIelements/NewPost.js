import React, { useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { AiFillCloseCircle } from 'react-icons/ai';

import './NewPost.css';
import { createPostItems } from '../../utils/sharedResources';
import CustomButtonAncher from './CustomButtonAncher';

import ImageFile from './ImageFile';

const NewPost = ({ avatar, name, toggleModal }) => {
  const [text, setText] = useState('');
  const [files, setFiles] = useState({
    Image: '',
    Video: ''
  });

  return (
    <div className="new-post">
      <div className="new-post__title">
        <div className="new-post__title__profile">
          <div className="new-post__title__profile__img">
            {avatar ? (
              <img src={`data:image/jpeg;base64,${avatar.buffer.data}`} />
            ) : (
              <CgProfile />
            )}
          </div>
          <div className="new-post__title__profile__text">
            <h3>{name}</h3>
            <p>Post to anyone</p>
          </div>
        </div>
        <div className="new-post__title__close">
          <AiFillCloseCircle
            className="new-post__icon"
            onClick={() => toggleModal(false)}
          />
        </div>
      </div>

      <div className="new-post__text">
        <span
          role="textbox"
          contentEditable={true}
          placeholder="What do you want to talk about?"
        ></span>
        <ImageFile />
      </div>
      <div className="new-post__bottom m-t-s-8">
        {/* <ul className="flex">
          {createPostItems.map((item) => {
            return (
              <li key={item.id} className="new-post__li">
                
              </li>
            );
          })}
        </ul> */}
      </div>
    </div>
  );
};

export default NewPost;
