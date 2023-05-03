import { SET_NAVBAR_VISIBILITY } from '../actions/type';

const INITIAL_STATE = {
  isVisible: false
};

export default function navbar(state = INITIAL_STATE, action) {
  if (action.type === SET_NAVBAR_VISIBILITY) {
    return {
      ...state,
      isVisible: action.payload.isVisible
    };
  } else {
    return state;
  }
}
