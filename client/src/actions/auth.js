import axios from 'axios';
import setReqAuthToken from '../utils/setReqAuthToken.js';
import { SET_AUTH_TOKEN, LOG_OUT } from './type.js';

export const setAuthToken = (token) => {
  return {
    type: SET_AUTH_TOKEN,
    payload: {
      token
    }
  };
};

export const login = (email, password) => async (dispatch) => {
  await axios({
    method: 'post',
    url: '/users/login',
    responseType: 'json',
    data: {
      email,
      password
    }
  })
    .then((res) => {
      const token = res.data.token;
      console.log(token);
      dispatch(setAuthToken(token));
      setReqAuthToken(token);
    })
    .catch((error) => console.log(error)); //catch = if failed
};

export const logout = () => {
  return {
    type: LOG_OUT,
    payload: null
  };
};
