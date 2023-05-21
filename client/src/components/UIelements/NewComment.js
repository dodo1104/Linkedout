import React, { useState } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { connect } from 'react-redux';

import { createNewComment } from '../../actions/posts';

import Comment from './Comment';
import CustomButtonAncher from './CustomButtonAncher';

import './NewComment.css';

const NewComment = ({ profile, postId, ...props }) => {
  const [text, setText] = useState('');
  const [isSpanValue, setIsSpanValue] = useState(false);
  const [isSpanFocused, setIsSpanFocused] = useState(true);

  return (
    <div className="new-comment">
      <div className="new-post__titles">
        <Comment comment={{ profile }} />
      </div>

      <div className="new-post__text">
        <span
          role="textbox"
          contentEditable={true}
          onInput={(e) => {
            const { innerHTML } = e.target;
            setText(innerHTML);
            innerHTML === '' ? setIsSpanValue(false) : setIsSpanValue(true);
          }}
          onFocus={() => setIsSpanFocused(true)}
          onBlur={() => setIsSpanFocused(false)}
          innerHTML={`${text}`}
        >
          {!isSpanValue && !isSpanFocused && (
            <p className="new-post__placeholder">
              <i>Leave a comment</i>
            </p>
          )}
        </span>
      </div>

      <div className="">
        <CustomButtonAncher
          className={`btn-3 ${!isSpanValue ? 'new-post__button--invalid' : ''}`}
          onClick={() =>
            props.createNewComment({
              text,
              postId
            })
          }
        >
          COMMENT
        </CustomButtonAncher>
      </div>
    </div>
  );
};

export default connect(null, {
  createNewComment
})(NewComment);
