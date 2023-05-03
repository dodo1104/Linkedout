import React from 'react';
import axios from 'axios';

import { isInputValid } from '../utils/sharedResources';
import { BsGoogle } from 'react-icons/bs';

import './RegisterPage.css';
import GenericInput from '../components/UIelements/GenericInput';
import CustomButtonAncher from '../components/UIelements/CustomButtonAncher';
import Logo from '../components/UIelements/Logo';

export default class RegisterPage extends React.Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef(''); //input id + 'Ref'
    this.passwordRef = React.createRef(''); //input id + 'Ref'
  }

  state = {
    email: '',
    password: '',
    isEmailValid: true,
    isPasswordValid: true,
    showPassword: false
  };

  inputValidation = (target) => {
    const { value, id } = target;
    console.log(target);
    const isValid = isInputValid(value, id);
    var param = `is${id}Valid`;
    param = param.replace(param.charAt(2), param.charAt(2).toUpperCase()); //change the id to be capital like in the state
    if (this.state[param] !== isValid)
      this.setState({ ...this.state, [param]: isValid });
  };

  onSubmitHandler = async (e) => {
    e.preventDefault();

    this.invalidId = '';
    const { email, password } = this.state; //need to take only the required inputs
    const arr1 = [email, password];
    const arr2 = ['email', 'password'];

    for (var i = 0; i < arr1.length; i++)
      if (!isInputValid(arr1[i], arr2[i])) {
        this.invalidId = arr2[i];
        var param = `is${arr2[i]}Valid`;
        param = param.replace(param.charAt(2), param.charAt(2).toUpperCase()); //change the id to be capital like in the state
        this.setState({ [param]: false }, () => {
          if (this.invalidId.length) {
            //if there is an invalid id
            const inputRef = `${this.invalidId}Ref`;
            this[inputRef].current.focus();
          }
        });
        break;
      }

    // if (this.invalidId.length > 0) {
    //   alert('email or password are invalid');
    //   return;
    // }

    // const { email, password } = this.state;
    // const res = await axios({
    //   method: 'post',
    //   url: '/users/register',
    //   responseType: 'json',
    //   data: {
    //     email,
    //     password
    //   }
    // });
    // console.log(res.data);
  };

  render() {
    return (
      <div className="bg-white full-vh">
        <div className="container">
          <div className="register-page">
            <div className="register-page__logo">
              <Logo className="fs-900" />
            </div>
            <p className="fs-900 l-h-400 m-t-l-0">
              Make the most of your professional life
            </p>
            <form
              className="form register-page__form  m-t-l-0"
              noValidate
              onSubmit={this.onSubmitHandler}
            >
              <div className="">
                <GenericInput
                  ref={this.emailRef}
                  id="email"
                  type="email"
                  label="Email"
                  isInputValid={this.state.isEmailValid}
                  value={this.state.email}
                  required={true}
                  alert="Please enter your email address."
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      email: e.target.value,
                      isEmailValid: true
                    });
                  }}
                  onBlur={(e) => this.inputValidation(e.target)}
                />
              </div>
              <div className="m-t-m-1">
                <GenericInput
                  ref={this.passwordRef}
                  id="password"
                  type="password"
                  label="Password"
                  isInputValid={this.state.isPasswordValid}
                  value={this.state.password}
                  required={true}
                  alert={<h4>Please enter valid password.</h4>}
                  showPassword={this.state.showPassword}
                  onChange={(e) => {
                    this.setState({
                      ...this.state,
                      password: e.target.value,
                      isPasswordValid: true
                    });
                  }}
                  onBlur={(e) => this.inputValidation(e.target)}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.setState({
                      ...this.state,
                      showPassword:
                        this.state.showPassword === true ? false : true
                    });
                  }}
                />
              </div>

              <div className="m-t-m-7">
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
              <div className="register-page__seperator">or</div>
              <div>
                <CustomButtonAncher
                  className="btn-7--green fs-400 btn--wide"
                  onClick={(e) => {
                    e.stopPropagation();
                  }}
                >
                  <span>
                    <BsGoogle />
                    &nbsp;&nbsp;Continue with Google
                  </span>
                </CustomButtonAncher>
              </div>
              <div className="m-t-l-0">
                <p>
                  Already on Linkedin?{' '}
                  <CustomButtonAncher
                    href="/login"
                    className="btn-6"
                    isAncher={true}
                  >
                    Sign in
                  </CustomButtonAncher>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
