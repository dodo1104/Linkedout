import { SET_USER_PROFILE, SET_PROFILES_BY_SEARCH } from '../actions/type.js';

const INITIAL_STATE = {
  profile: null,
  profilesBySearch: []
};

export default function profile(state = INITIAL_STATE, action) {
  if (action.type === SET_USER_PROFILE) {
    return {
      ...state,
      profile: action.payload.profile
    };
  }
  if (action.type === SET_PROFILES_BY_SEARCH) {
    return {
      ...state,
      profilesBySearch: [...action.payload.profiles]
    };
  } else {
    return state;
  }
}
