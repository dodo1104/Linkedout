import {
  SET_POSTS,
  SET_COMMENTS,
  UPDATE_POSTS_IS_LOADED,
  UPDATE_COMMENTS_IS_LOADED,
  ADD_NEW_POST_WITH_INDEX,
  ADD_NEW_COMMENT,
  SORT_POSTS_BY_TIME,
  UPDATE_IS_POST_UPLOADED
} from '../actions/type';
import { sortArrOfObjectsByField } from '../utils/sharedResources';

const INITIAL_STATE = {
  posts: [],
  isLoaded: 'INIT', //INIT - first state, SUCCEEDED - got new docs, FAILED - something went wrong, DONE - got all docs (returns [])
  comments: {},
  lastEdittedCommentsPostId: null,
  isCommentsLoaded: 'INIT', //same like 'isLoaded' but for the comments of a post
  isPostUploaded: false
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
    console.log('SET_COMMENTS:');
    const { comments, postId } = action.payload;
    const stateComments = state.comments[postId]
      ? [...state.comments[postId]]
      : [];
    console.log(stateComments);
    console.log(state.comments);
    console.log(postId);
    return {
      ...state,
      comments: { ...comments, [postId]: [...stateComments, ...comments] },
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
  }
  if (action.type === SORT_POSTS_BY_TIME) {
    const { posts } = state;
    const sortedPosts = sortArrOfObjectsByField(
      posts,
      '_id',
      action.payload.direction
    );
    return {
      ...state,
      posts: sortedPosts
    };
  }
  if (action.type === UPDATE_IS_POST_UPLOADED) {
    const { isPostUploaded } = action.payload;

    return {
      ...state,
      isPostUploaded
    };
  }
  // if (action.type === ADD_NEW_COMMENT) {
  //   const { comment, postId = 0 } = action.payload;
  //   // const comments = { [postId]: [...state.comments[postId], comment] };
  //   console.log('ADD_NEW_COMMENT comments: ', state.comments[postId]);
  //   return {
  //     ...state
  //     // comments: { [postId]: [...state.comments[postId], comment] },
  //     // lastEdittedCommentsPostId: postId
  //   };
  // }
  else {
    return state;
  }
}
