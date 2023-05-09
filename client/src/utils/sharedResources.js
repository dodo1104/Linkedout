import { BsFillPeopleFill, BsFillImageFill } from 'react-icons/bs';
import { FaHome, FaVideo } from 'react-icons/fa';
import { TiMessages } from 'react-icons/ti';
import { IoMdNotifications } from 'react-icons/io';

export const isInputValid = (value, id) => {
  switch (id) {
    case 'email':
      return /\S+@\S+\.\S+/.test(value);
    case 'password':
      return /(?=.{6,})+(?=.*[A-Z])+(?=.*[a-z])/.test(value);
      //The password is at least 8 characters long (?=.{6,})
      //The password has at least one uppercase letter (?=.*[A-Z])
      //The password has at least one lowercase letter (?=.*[a-z])
      //The password has at least one digit (?=.*[0-9])
      //The password has at least one special character ([^A-Za-z0-9])
      break;
    default:
      return false;
  }
};

export const convertToBase64 = (profiles) => {
  //recieves JSON or array of JSON. returns JSON or array of JSON
  let arr = [];

  if (!profiles.length) {
    arr.push(profiles); //profiles is only one profile (JSON)
  } else {
    //profiles is an array of profiles (array of JSON)
    arr = [...profiles];
  }
  arr.forEach((profile) => {
    profile.avatar.buffer.data = String.fromCharCode.apply(
      //convert the data buffer to base64 for the img
      null,
      new Uint8Array(profile.avatar.buffer.data)
    );
  });
  console.log('arr:\n', arr);
  if (!profiles.length) return arr[0];
  return [...arr];
};

export const debounce = (input, delay = 500, func) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
};

export const navbarItems = [
  { id: 1, label: 'Home', icon: <FaHome />, linkTo: '/home' },
  {
    id: 2,
    label: 'My Network',
    icon: <BsFillPeopleFill />,
    linkTo: '/home'
  },
  { id: 3, label: 'Messaging', icon: <TiMessages />, linkTo: '/home' },
  {
    id: 4,
    label: 'Notifications',
    icon: <IoMdNotifications />,
    linkTo: '/home'
  }
];

export const createPostItems = [
  {
    id: 1,
    label: 'Image',
    icon: <BsFillImageFill style={{ fill: 'red' }} />,
    accept: '.jpeg, .jpg, .png'
  },
  {
    id: 2,
    label: 'Video',
    icon: <FaVideo style={{ fill: 'green' }} />,
    accept: '.mp3,.mp4'
  }
];
