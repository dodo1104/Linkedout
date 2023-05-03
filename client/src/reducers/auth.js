import { SET_AUTH_TOKEN, LOG_OUT } from '../actions/type.js';

const INITIAL_STATE = {
  token: localStorage.getItem('my-linkedin-token'),
  error: null,
  isUserLoaded: false
};

export default function auth(state = INITIAL_STATE, action) {
  // localStorage.removeItem('my-linkedin-token');
  if (action.type === SET_AUTH_TOKEN) {
    const { token } = action.payload;
    localStorage.setItem('my-linkedin-token', token);
    return {
      ...state,
      token
    };
  }
  if (action.type === LOG_OUT) {
    localStorage.removeItem('my-linkedin-token');
    return {
      ...state,
      token: null,
      error: null,
      isUserLoaded: false
    };
  } else {
    return state;
  }
}
