import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { CgProfile } from 'react-icons/cg';
import moment from 'moment';

import { fetchComments } from '../../actions/posts';

import './Post.css';

import Comment from './Comment.js';
import NewComment from './NewComment.js';
import { convertToBase64 } from '../../utils/sharedResources';

function Post({ data, ...props }) {
  const REVERSE_ORDER = -1;

  const [showComments, setShowComments] = useState(false);
  const [commentsBlockIndex, setCommentsBlockIndex] = useState(0);

  const { date, file, profile, text, _id: post_id } = data;
  const { data: bufferData = null } = profile.avatar.buffer;
  const { comments = [], commentsLoadingPhase = 'INIT' } = props;

  // console.log('COMMENTS: ', comments);

  // console.log('file:\n', file.buffer.data);
  const formatDate = moment(date).format('YYYY-MM-DD HH:MM');
  // console.log('comments:\n', comments);
  // console.log('Post file: ', file); //{file: {buffer: {type, data}, mimetype, size}}
  // console.log('Post file: ', convertToBase64(file.buffer.data));
  // console.log('Post file: ', convertToBase64(file.buffer.data));

  useEffect(() => {
    if (commentsLoadingPhase === 'SUCCEEDED') {
      setCommentsBlockIndex(commentsBlockIndex + 1);
    }
  }, [commentsLoadingPhase]);

  return (
    <div className="post" key={post_id}>
      <div className="info-box">
        <div className="post__header">
          {/* avatar, name, desc, date of post */}
          <div className="post__header__avatar">
            {bufferData != null ? (
              <img
                src={`data:${profile.avatar.mimetype};base64,${convertToBase64(
                  bufferData
                )}`}
              />
            ) : (
              <CgProfile />
            )}
          </div>
          <div className="post__header__text">
            <p className="fs-500 fw-600" data-label="name">
              {profile.name}
            </p>
            <p className="fs-350">
              {profile.desc}Bsc. Software Engineer | Frontend
            </p>
            <p className="fs-300 color-gray-medium">{formatDate}</p>
          </div>
        </div>
        <div className="post__message">
          <div className="post__message__text">
            <span className="fs-500">{text}</span>
          </div>
          <div className="post__message__file">
            {file && (
              <img
                src={`data:${file.mimetype};base64,${convertToBase64(
                  file.buffer.data
                )}`}
              />
            )}
          </div>
        </div>
        {/* the comments will be lazy loading and have a 'Load More' button and will show and load like the posts (with index and array and etc...) */}
        <div className="post__comments">
          <div className="post__comments__new-comment">
            <NewComment profile={profile} postId={post_id} />
          </div>
          <button
            className={comments.length && 'disable-pointer-events'}
            onClick={() => props.fetchComments(post_id, REVERSE_ORDER)}
            style={{
              cursor: 'pointer'
            }}
          >
            comments
          </button>
          {comments.length ? (
            <div>
              {comments.map((comment) => {
                return <Comment comment={comment} />; //need to add key={comment._id}
              })}
              {commentsLoadingPhase != 'DONE' && (
                <button
                  onClick={() =>
                    props.fetchComments(post_id, commentsBlockIndex)
                  }
                  style={{ cursor: 'pointer' }}
                >
                  Load More...
                </button>
              )}
            </div>
          ) : (
            'No Comments'
          )}
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = ({ posts }) => {
  // alert(
  //   'HomePage - mapStateToProps  - state: ' + JSON.stringify(posts.isLoaded)
  // );

  return {
    comments: posts.comments[posts.lastEdittedCommentsPostId],
    commentsLoadingPhase: posts.isCommentsLoaded
  };
};

export default connect(mapStateToProps, {
  fetchComments
})(Post);
