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

export const convertToBase64 = (data) => {
  return window.btoa(String.fromCharCode(...data));
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
  { id: 1, label: 'Home', icon: <FaHome />, navTo: '/home' },
  {
    id: 2,
    label: 'My Profile',
    icon: <BsFillPeopleFill />,
    navTo: '/profile/my-profile'
  },
  { id: 3, label: 'Messaging', icon: <TiMessages />, navTo: '/home' },
  {
    id: 4,
    label: 'Notifications',
    icon: <IoMdNotifications />,
    navTo: '/home'
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
