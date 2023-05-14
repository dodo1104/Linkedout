import axios from 'axios';
import { SET_USER_PROFILE, SET_PROFILES_BY_SEARCH } from './type.js';
import { convertToBase64 } from '../utils/sharedResources';

export const fetchProfileById =
  (token, profile_id = null) =>
  async (dispatch) => {
    const test = '62efa6d63afc73de6a6a95de';
    await axios({
      method: 'get',
      url: `/profile/${test}`,
      // responseType: 'json',
      data: {
        token
      }
    }).then((res) => {
      console.log('res:\n', res.data);
    });
    // await axios({
    //   method: 'get',
    //   url: '/profile/:profile_id',
    //   // responseType: 'json',
    //   data: {
    //     token
    //   }
    // })
    //   .then((res) => {
    //     // logoRef.current && logoRef.current.setCollapse(); //finish loading animation
    //     const { data } = res;
    //     localStorage.setItem('my-linkedin-profile-example', JSON.stringify(data));
    //     if (data.avatar.buffer) {
    //       data.avatar.buffer.data = String.fromCharCode.apply(
    //         //convert the data buffer to base64 for the img
    //         null,
    //         new Uint8Array(data.avatar.buffer.data)
    //       );
    //     }
    //     dispatch({
    //       type: SET_USER_PROFILE,
    //       payload: {
    //         profile: data
    //       }
    //     });
    //     console.log(JSON.stringify(res.data));
    //   })
    //   .catch((error) => console.log(error)); //catch = if failed

    const profileExample = localStorage.getItem('my-linkedin-profile-example');
    const parsedProfile = JSON.parse(profileExample);
    // console.log(JSON.stringify(parsedProfile.avatar.mimetype));

    const { data } = parsedProfile.avatar.buffer;

    parsedProfile.avatar.buffer.data = String.fromCharCode.apply(
      //convert the data buffer to base64 for the img
      null,
      new Uint8Array(data)
    );
    // alert('sss');
    // console.log('parsedProfile:\n', parsedProfile);
    setTimeout(() => {
      dispatch({
        type: SET_USER_PROFILE,
        payload: {
          profile: {
            ...parsedProfile
          }
        }
      });
    }, 1000);
  };

export const fetchOwnProfile = (token) => async (dispatch) => {
  // await axios({
  //   method: 'get',
  //   url: '/profile/my-profile'
  // responseType: 'json',
  //   .then((res) => {
  //     // logoRef.current && logoRef.current.setCollapse(); //finish loading animation
  //     const { data } = res;
  //     localStorage.setItem('my-linkedin-profile-example', JSON.stringify(data));
  //     if (data.avatar.buffer) {
  //       data.avatar.buffer.data = String.fromCharCode.apply(
  //         //convert the data buffer to base64 for the img
  //         null,
  //         new Uint8Array(data.avatar.buffer.data)
  //       );
  //     }
  //     dispatch({
  //       type: SET_USER_PROFILE,
  //       payload: {
  //         profile: data
  //       }
  //     });
  //     console.log(JSON.stringify(res.data));
  //   })
  //   .catch((error) => console.log(error)); //catch = if failed

  const profileExample = localStorage.getItem('my-linkedin-profile-example');
  let parsedProfile = JSON.parse(profileExample);
  console.log('parsedProfile 1:\n', parsedProfile);
  parsedProfile.avatar.buffer.data = convertToBase64(
    parsedProfile.avatar.buffer.data
  );
  // console.log(JSON.stringify(parsedProfile.avatar.mimetype));
  console.log('parsedProfile 2:\n', parsedProfile);

  setTimeout(() => {
    dispatch({
      type: SET_USER_PROFILE,
      payload: {
        profile: {
          ...parsedProfile
        }
      }
    });
  }, 1000);
};

export const fetchProfileBySearch =
  (value = 'ben') =>
  async (dispatch) => {
    await axios({
      method: 'get',
      url: `/profile/search/${value}`
    }).then((res) => {
      const { data } = res;
      // console.log('fetchProfileBySearch - res.data:\n', data);
      // localStorage.setItem('profiles-by-search-value', JSON.stringify(data));
      // alert('hey');
      let profiles = localStorage.getItem('profiles-by-search-value'); //search value is 'e'
      profiles = JSON.parse(profiles);
      profiles = convertToBase64(profiles);
      console.log('PROFILES: ', profiles);

      setTimeout(() => {
        dispatch({
          type: SET_PROFILES_BY_SEARCH,
          payload: {
            profiles: [...profiles]
          }
        });
      }, 1000);
    });
  };
