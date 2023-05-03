import React from 'react';

import './LogPage.css';
import CustomInput from '../components/UIelements/CustomInput';
import { isInputValid } from '../utils/sharedResources';
import CustomButtonAncher from '../components/UIelements/CustomButtonAncher';

class LogPage extends React.Component {
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
    // var { value, id } = target;
    // console.log(target);
    // const isValid = isInputValid(value, id);
    // id = id.charAt(0).toUpperCase() + id.slice(1); //change the id to be capital like in the state
    // var param = `is${id}Valid`;
    // if (this.state[param] !== isValid)
    //   this.setState({ ...this.state, [param]: isValid });
  };

  checkInputsValidation() {
    this.setState({
      ...this.state,
      isEmailValid: true,
      isPasswordValid: true
    });

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
  }

  render() {
    return (
      <div
        className="logPage"
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBlock: '13vw',
          marginInline: '40vw',
          gap: '3rem'
        }}
      >
        <CustomInput
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
              email: e.target.value
            });
          }}
        />
        <CustomInput
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
              password: e.target.value
            });
          }}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
              ...this.state,
              showPassword: this.state.showPassword === true ? false : true
            });
          }}
        />
        <button
          style={{
            marginTop: '8vh',
            marginLeft: '3vw',
            width: '10rem',
            height: '3rem'
          }}
          onClick={() => {
            this.checkInputsValidation();
          }}
        >
          Press Me
        </button>

        {/* <CustomButtonAncher className="btn-6">show</CustomButtonAncher> */}
        {/* <CustomButtonAncher className="btn-6" isAncher={true} href="#">
          show
        </CustomButtonAncher> */}
      </div>
    );
  }
}

export default LogPage;
