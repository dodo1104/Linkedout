import React, { useState, useRef, useEffect } from 'react';
import { CgProfile } from 'react-icons/cg';
import { AiFillCloseCircle } from 'react-icons/ai';

import './NewPost.css';
import { createPostItems } from '../../utils/sharedResources';
import CustomButtonAncher from './CustomButtonAncher';
import { createNewPost } from '../../actions/posts';

import ImageFile from './ImageFile';
import { connect } from 'react-redux';

const NewPost = ({ avatar, name, toggleModal, ...props }) => {
  const [text, setText] = useState('');
  const [isSpanValue, setIsSpanValue] = useState(false);
  const [isSpanFocused, setIsSpanFocused] = useState(true);
  const [file, setFile] = useState(undefined);

  const spanRef = useRef();

  const updateFile = (newFile) => {
    setFile(newFile);
  };

  useEffect(() => {
    if (spanRef.current) spanRef.current.focus();
  }, [spanRef]);

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
          ref={spanRef}
          role="textbox"
          contentEditable={true}
          onInput={(e) => {
            const { innerHTML } = e.target;
            setText(innerHTML);
            innerHTML === '' ? setIsSpanValue(false) : setIsSpanValue(true);
          }}
          onFocus={() => setIsSpanFocused(true)}
          onBlur={() => setIsSpanFocused(false)}
          innerHTML={text}
        >
          {!isSpanValue && !isSpanFocused && (
            <p className="new-post__placeholder">
              <i>What do you want to talk about?</i>
            </p>
          )}
        </span>
        <ImageFile updateFile={updateFile} />
      </div>
      <div className="new-post__bottom m-t-s-8">
        <ul className="flex">
          {createPostItems.map((item) => {
            return (
              <label
                htmlFor={`input${item.label}`}
                key={item.id}
                className="new-post__li"
              >
                {item.icon}
              </label>
            );
          })}
        </ul>
      </div>
      <div className="new-post__post-button">
        <CustomButtonAncher
          className={`btn-3 new-post__button ${
            !isSpanValue ? 'new-post__button--invalid' : ''
          }`}
          onClick={() => {
            file &&
              props.createNewPost({
                text,
                file
              });
            toggleModal(false);
          }}
        >
          POST
        </CustomButtonAncher>
      </div>
    </div>
  );
};

export default connect(null, {
  createNewPost
})(NewPost);
