import { SET_NAVBAR_VISIBILITY } from './type';

export const setNavbarVisibility = (isVisible) => {
  return {
    type: SET_NAVBAR_VISIBILITY,
    payload: {
      isVisible
    }
  };
};
