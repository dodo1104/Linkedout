import {
  SET_POSTS,
  SET_COMMENTS,
  UPDATE_POSTS_IS_LOADED,
  UPDATE_COMMENTS_IS_LOADED,
  ADD_NEW_POST_WITH_INDEX
} from '../actions/type';

const INITIAL_STATE = {
  posts: [],
  isLoaded: 'INIT', //INIT - first state, SUCCEEDED - got new docs, FAILED - something went wrong, DONE - got all docs (returns [])
  comments: {},
  lastEdittedCommentsPostId: null,
  isCommentsLoaded: 'INIT' //same like 'isLoaded' but for the comments of a post
};

export default function posts(state = INITIAL_STATE, action) {
  if (action.type === SET_POSTS) {
    const { posts } = action.payload;
    const statePosts = [...state.posts];
    let postsArray = [];
    // console.log('posts:\n', posts);
    // console.log('statePosts:\n', statePosts);
    if (statePosts.length > 0) {
      posts.forEach((post) => {
        let similar = statePosts.filter((statePost) => {
          return statePost._id == post._id;
        });
        if (similar.length == 0) postsArray = [...postsArray, post];
      });
      postsArray = [...statePosts, ...postsArray];
    } else postsArray = [...posts];
    console.log('posts reducer - posts:\n', posts);
    console.log('posts reducer - statePosts:\n', statePosts);
    console.log('posts reducer - postsArray:\n', postsArray);
    return {
      ...state,
      posts: postsArray
    };
  }
  if (action.type === SET_COMMENTS) {
    const { comments, postId } = action.payload;
    return {
      ...state,
      comments: { [postId]: [...comments] },
      lastEdittedCommentsPostId: postId
    };
  }
  if (action.type === UPDATE_POSTS_IS_LOADED) {
    return {
      ...state,
      isLoaded: action.payload.isLoaded
    };
  }
  if (action.type === UPDATE_COMMENTS_IS_LOADED) {
    return {
      ...state,
      isCommentsLoaded: action.payload.isLoaded
    };
  }
  if (action.type === ADD_NEW_POST_WITH_INDEX) {
    const { payload } = action;
    let updatedPosts = [...state.posts];

    console.log('updatedPosts: ', updatedPosts);
    console.log(payload);
    updatedPosts.splice(payload.index, 0, payload.post);
    console.log('ADD_NEW_POST_WITH_INDEX: ', updatedPosts);

    return {
      ...state,
      posts: [...updatedPosts]
    };
  } else {
    return state;
  }
}
