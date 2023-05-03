import axios from 'axios';

const setBaseURL = () => {
  axios.defaults.baseURL = 'http://localhost:5000/';
};

export default setBaseURL;
