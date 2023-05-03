import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';

import { isInputValid } from '../utils/sharedResources';
import { login, setAuthToken } from '../actions/auth';
import { setNavbarVisibility } from '../actions/navbar';

import { SET_AUTH_TOKEN } from '../actions/type';

import { BsGoogle } from 'react-icons/bs';
import CustomInput from '../components/UIelements/CustomInput';
import CustomButtonAncher from '../components/UIelements/CustomButtonAncher';
import Logo from '../components/UIelements/Logo';
import './LoginPage.css';
import setReqAuthToken from '../utils/setReqAuthToken';

const LoginPage = (props) => {
  const emailRef = useRef(''); //input id + 'Ref'
  const passwordRef = useRef(''); //input id + 'Ref'

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  // useGetToken();
  const navigate = useNavigate();
  let tokenRedux = props.token;
  let token = tokenRedux
    ? tokenRedux
    : localStorage.getItem('my-linkedin-token');

  props.setNavbarVisibility(false); //hide navbar

  useEffect(() => {
    if (token) {
      setReqAuthToken(token);
      setAuthToken(token); //if token of redux or localStorage is null, this will update both with the new token
    }
    if (token) navigate('/home');
  }, [token]);

  const onSubmitHandler = async (e) => {
    console.log('submitted');

    e.preventDefault();

    setIsEmailValid(true);
    setIsPasswordValid(true);

    let invalidId = -1;
    const values = [email, password];
    const types = ['email', 'password'];
    const setValidationStates = [
      (bool) => setIsEmailValid(bool),
      (bool) => setIsPasswordValid(bool)
    ];
    const refs = [emailRef, passwordRef];

    // for (var i = 0; i < values.length; i++)
    //   if (!isInputValid(values[i], types[i])) {
    //     invalidId = i;
    //     setValidationStates[i](false);
    //     refs[i].current.focus();
    //     break;
    //   }

    // if (invalidId >= 0) {
    //   alert('email or password are invalid');
    //   return;
    // }
    props.login(email, password);
  };

  return (
    <div className="bg-white full-vh">
      <div className="container">
        <div className="login-page">
          <div className="login-page__logo">
            <Logo className="fs-900" />
          </div>
          <form onSubmit={onSubmitHandler} className="form  m-t-l-0" noValidate>
            <div>
              <p className="ff-primary fw-400 fs-900 l-h-400">Sign in</p>
              <p className="color-gray-dark">
                Stay updated on your professonal world
              </p>
            </div>
            <div className="m-t-m-5">
              <CustomInput
                ref={emailRef}
                id="email"
                type="email"
                label="Email"
                isInputValid={isEmailValid}
                value={email}
                required={true}
                alert="Please enter your email address."
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="m-t-m-5">
              <CustomInput
                ref={passwordRef}
                id="password"
                type="password"
                label="Password"
                isInputValid={isPasswordValid}
                value={password}
                required={true}
                alert={<h4>Please enter valid password.</h4>}
                showPassword={showPassword}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPassword(showPassword === true ? false : true);
                }}
              />
            </div>
            <div className="m-t-s-8">
              <CustomButtonAncher
                className="btn-6 fw-600 m-nl-s-4"
                isAncher={true}
                href="#"
              >
                Forgot password?
              </CustomButtonAncher>
            </div>
            <div className="m-t-m-1">
              <CustomButtonAncher
                className="btn-3 fs-400 btn--p-block-400 btn--wide"
                type="submit"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                Sign in
              </CustomButtonAncher>
            </div>
            <div className="login-page__seperator">or</div>
            <div>
              <CustomButtonAncher
                className="btn-7--green fs-400 btn--wide"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <span>
                  <BsGoogle />
                  &nbsp;&nbsp;Sign in with Google
                </span>
              </CustomButtonAncher>
            </div>
          </form>
          <div className="m-t-l-0">
            <p>
              New to Linkedin?{' '}
              <CustomButtonAncher
                href="/register"
                className="btn-6"
                isAncher={true}
              >
                Join now
              </CustomButtonAncher>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     setUserToken: (token) => dispatch(setUserToken(token))
//   };
// };
//export default connect(null, mapDispatchToProps)(LoginPage);
// FOR CLASS COMPONENTS

const mapStateToProps = ({ auth }) => {
  return { token: auth.token };
};

export default connect(mapStateToProps, {
  login,
  setAuthToken,
  setNavbarVisibility
})(LoginPage);
