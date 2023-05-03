import React from 'react';

import './RegPage.css';
import { isInputValid } from '../utils/sharedResources';

import GenericInput from '../components/UIelements/GenericInput';

class RegPage extends React.Component {
  constructor(props) {
    super(props);
    this.emailRef = React.createRef(''); //input id + 'Ref'
    this.passwordRef = React.createRef(''); //input id + 'Ref'
    this.searchRef = React.createRef(''); //input id + 'Ref'
  }

  state = {
    email: '',
    password: '',
    search: '',
    isEmailValid: true,
    isPasswordValid: true,
    showPassword: false
  };

  inputValidation = (target) => {
    var { value, id } = target;
    console.log(target);
    const isValid = isInputValid(value, id);
    id = id.charAt(0).toUpperCase() + id.slice(1); //change the id to be capital like in the state
    var param = `is${id}Valid`;
    if (this.state[param] !== isValid)
      this.setState({ ...this.state, [param]: isValid });
  };

  render() {
    console.log(document);
    return (
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <GenericInput
          ref={this.searchRef}
          id="search"
          type="text"
          value={this.state.search}
          onChange={(e) => {
            this.setState({
              ...this.state,
              search: e.target.value
            });
          }}
        />
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
              showPassword: this.state.showPassword === true ? false : true
            });
          }}
        />
      </div>
    );
  }
}

export default RegPage;
