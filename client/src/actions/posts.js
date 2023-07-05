import axios from 'axios';
import { convertToBase64 } from '../utils/sharedResources.js';
import {
  SET_POSTS,
  SET_COMMENTS,
  UPDATE_POSTS_IS_LOADED,
  UPDATE_COMMENTS_IS_LOADED,
  ADD_NEW_POST_WITH_INDEX,
  SORT_POSTS_BY_TIME,
  UPDATE_IS_POST_UPLOADED
  // ADD_NEW_COMMENT
} from './type.js';

export const fetchPosts = (token, index) => async (dispatch) => {
  const body = JSON.stringify({
    index: 1
  });
  // body = JSON.parse(body);
  // body = JSON.stringify(body);
  // console.log(isObject(body));
  // console.log('body:\n' + body);
  const config = {
    headers: { 'Content-Type': 'application/json' }
  };
  // axios
  //   .get('/posts', body, config)
  dispatch(updatePostsIsLoaded('LOADING'));
  axios({
    method: 'get', //GET request can't send data such as FormData but only params
    url: '/posts',
    headers: { 'Content-Type': 'application/json' },
    params: {
      body
    }
  })
    .then((res) => {
      // logoRef.current && logoRef.current.setCollapse(); //finish loading animation
      const { data } = res;
      console.log('data:', data);

      let posts = localStorage.getItem('my-linkedin-post-example');

      posts = JSON.parse(posts);
      let postsArr = [...posts];
      console.log('postsArr:\n', postsArr);
      index = postsArr.length;

      if (index > 0) {
        for (let i = 0; i < index * 5; i++) {
          //THIS IS FOR CHECKING WITH 1 POST
          postsArr[0]._id = i;
          posts = [...posts, JSON.parse(JSON.stringify(postsArr[0]))];
        }
        posts = posts.slice(1, posts.length);
        // for (let i = 0; i < index * 5; i++) { THIS IS FOR REAL POSTS STREAM
        //   postsArr[i % 5]._id = i;
        //   posts = [...posts, JSON.parse(JSON.stringify(postsArr[i % 5]))];
        // }
        // for (let j = 0; j < posts.length; j++) {
        //   posts[j]._id = j;
        // }
      }
      console.log('posts:\n', posts);
      setTimeout(() => {
        dispatch(
          updatePostsIsLoaded('SUCCEEDED')
        ); /*this update happens too fast for the UX,
            so dispatch(updatePostsIsLoaded('LOADING')) doesn't render the DOM.
            to solve this, dispatch(updatePostsIsLoaded('SUCCEEDED')) needs to be async*/
      }, 10);
      // console.log(posts);
      dispatch({
        type: SET_POSTS,
        payload: {
          posts: posts
        }
      });
      // console.log(JSON.stringify(res.data));
    })
    .catch((error) => {
      console.log(error);
      updatePostsIsLoaded('FAILED');
    }); //catch = if failed

  // let postExample = localStorage.getItem('my-linkedin-post-example');
  // console.log(postExample);
  // postExample = JSON.parse(postExample);
  // setTimeout(() => {
  //   dispatch({
  //     type: SET_POSTS,
  //     payload: {
  //       posts: {
  //         ...postExample
  //       }
  //     }
  //   });
  // }, 1000);
};
export const fetchComments = (postId, index) => async (dispatch) => {
  //index > 0 = order from newest to oldest
  //index < 0 = order from oldest to newest
  const body = JSON.stringify({
    index: 1,
    postId
  });
  console.log('postId:\n' + postId);
  dispatch(updateCommentsIsLoaded('LOADING'));
  axios({
    method: 'get',
    url: '/posts',
    headers: { 'Content-Type': 'application/json' },
    params: {
      body
    }
  })
    .then((res) => {
      const { data } = res;
      console.log('data:', data);

      // localStorage.setItem('my-linkedin-comment-example', JSON.stringify(data));
      let comments = localStorage.getItem('my-linkedin-comment-example');
      comments = JSON.parse(comments);
      let tempComments = [...comments];
      console.log('comments:\n', comments);
      // console.log('postsWithComments:\n', ...JSON.parse(postsWithComment));
      // console.log('actions - posts - fetchPosts - posts:\n' + posts);

      if (index > 0) {
        for (let i = 0; i < index * 4; i++) {
          //THIS IS FOR CHECKING WITH 1 COMMENT
          tempComments[0]._id = i;
          console.log('tempComments[0]._id = ', tempComments[0]._id);
          comments = [...comments, JSON.parse(JSON.stringify(tempComments[0]))];
        }
        comments = comments.slice(1, comments.length);
      }

      console.log('comments:\n', comments);
      //if(data.length > 0)
      if (index > 2) {
        setTimeout(() => {
          dispatch(
            updateCommentsIsLoaded('DONE')
          ); /*this update happens too fast for the UX,
              so dispatch(updatePostsIsLoaded('LOADING')) doesn't render the DOM.
              to solve this, dispatch(updatePostsIsLoaded('SUCCEEDED')) needs to be async*/
        }, 10);
      } else
        setTimeout(() => {
          dispatch(
            updateCommentsIsLoaded('SUCCEEDED')
          ); /*this update happens too fast for the UX,
            so dispatch(updatePostsIsLoaded('LOADING')) doesn't render the DOM.
            to solve this, dispatch(updatePostsIsLoaded('SUCCEEDED')) needs to be async*/
        }, 10);
      dispatch({
        type: SET_COMMENTS,
        payload: {
          postId,
          comments
        }
      });
      // console.log(JSON.stringify(res.data));
    })
    .catch((error) => {
      console.log(error);
      updateCommentsIsLoaded('FAILED');
    }); //catch = if failed

  // let postExample = localStorage.getItem('my-linkedin-post-example');
  // console.log(postExample);
  // postExample = JSON.parse(postExample);
  // setTimeout(() => {
  //   dispatch({
  //     type: SET_POSTS,
  //     payload: {
  //       posts: {
  //         ...postExample
  //       }
  //     }
  //   });
  // }, 1000);
};

export const updatePostsIsLoaded = (isLoaded) => {
  return {
    type: UPDATE_POSTS_IS_LOADED,
    payload: {
      isLoaded
    }
  };
};

export const updateCommentsIsLoaded = (isLoaded) => {
  return {
    type: UPDATE_COMMENTS_IS_LOADED,
    payload: {
      isLoaded
    }
  };
};

export const createNewPost =
  (post = {}) =>
  async (dispatch) => {
    // const data = new FormData();
    // data.append('file', post.file);
    // data.append('text', post.text);
    // const body = JSON.stringify({
    //   text: post.text,
    //   file: post.file
    // });
    // console.log('createNewPost action');
    // axios({
    //   method: 'post',
    //   url: '/posts/upload',
    //   headers: { 'Content-Type': 'application/json' },
    //   data
    // })
    //   .then((res) => {
    //     const { data } = res;
    //     console.log('DATA: ', data);
    //     localStorage.setItem(
    //       'linkedout-add-new-post-example',
    //       JSON.stringify(data)
    //     );
    //     dispatch(addNewPostWithIndex(data));
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    let newPost = JSON.parse(
      localStorage.getItem('linkedout-add-new-post-example')
    );
    newPost = { ...newPost, _id: 10, date: '2030-08-10T10:42:21.726Z' };
    console.log('linkedout-add-new-post-example: ', newPost);

    // newPost.file.buffer.data = convertToBase64(newPost.file.buffer.data);

    dispatch(addNewPostWithIndex(newPost));
  };

export const createNewComment =
  (comment, post_id = 0) =>
  async (dispatch) => {
    const data = new FormData();
    data.append('text', comment.text);
    data.append('post_id', post_id);

    axios({
      method: 'post',
      url: '/posts/:post_id/comment',
      headers: { 'Content-Type': 'application/json' },
      data
    })
      .then((res) => {
        const { data } = res;
        console.log('DATA: ', data);
        // localStorage.setItem(
        //   'linkedout-add-new-comment-example',
        //   JSON.stringify(data)
        // );
        let lastComment = localStorage.getItem(
          'linkedout-add-new-comment-example'
        );
        lastComment = JSON.parse(lastComment);
        console.log('lastComment: ', lastComment);
        dispatch({
          type: SET_COMMENTS,
          payload: {
            comments: [lastComment],
            postId: post_id
          }
        });
      })
      .catch((error) => {
        console.log(error);
      });

    // let newPost = JSON.parse(
    //   localStorage.getItem('linkedout-add-new-post-example')
    // );

    // newPost.file.buffer.data = convertToBase64(newPost.file.buffer.data);
  };

export const sortPostsByTime = (direction) => {
  return {
    type: SORT_POSTS_BY_TIME,
    payload: {
      direction
    }
  };
};
export const updateIsPostUploaded = (isPostUploaded) => {
  return {
    type: UPDATE_IS_POST_UPLOADED,
    payload: {
      isPostUploaded
    }
  };
};

const addNewPostWithIndex = (post, index = 0) => {
  return {
    type: ADD_NEW_POST_WITH_INDEX,
    payload: {
      post,
      index
    }
  };
};

// const addNewComment = (comment, post_id) => {
//   return {
//     type: ADD_NEW_COMMENT,
//     payload: {
//       comment,
//       post_id
//     }
//   };
// };
