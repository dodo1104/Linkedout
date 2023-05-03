import React from 'react';
import CustomButtonAncher from './CustomButtonAncher';

import './CustomInput.css';

class CustomInput extends React.Component {
  //props: onChange, isInputValid, value, ref for focus, type
  state = {
    isInputFocused: false
  };

  render() {
    const {
      isInputValid = true,
      alert,
      showPassword,
      type,
      innerRef,
      ...rest
    } = this.props;
    console.log(this.props);
    return (
      <div className="custom-input">
        {rest.label && (
          <label
            className={`custom-input__label ${
              this.state.isInputFocused == false && this.props.value.length == 0
                ? 'tran-scale-move-vertical'
                : ''
            } ${isInputValid ? '' : 'invalid'}`}
            style={{
              '--tran-scale-move-vertical-scale': '1.4',
              '--tran-scale-move-vertical-trans':
                '0.63em' /*trans = font-size * scale / 2 = 0.9em * 1.4 / 2*/
            }}
            htmlFor={rest.id}
          >
            {rest.label}
          </label>
        )}
        <div className="custom-input__div">
          <input
            ref={innerRef}
            className={`input custom-input__input ${
              isInputValid ? '' : 'invalid'
            }`}
            type={
              rest.id !== 'password'
                ? type
                : showPassword === true
                ? 'text'
                : 'password'
            }
            {...rest}
            onClick={(e) => {
              e.stopPropagation();
              this.setState({ ...this.state, isInputFocused: true });
            }}
            onFocus={(e) => {
              this.setState({ ...this.state, isInputFocused: true });
            }}
            onBlur={(e) => {
              this.setState({ ...this.state, isInputFocused: false });
            }}
          />
          {this.props.id === 'password' && (
            <CustomButtonAncher
              className="btn-6 custom-input__button"
              onClick={this.props.onClick}
            >
              {showPassword === true ? 'hide' : 'show'}
            </CustomButtonAncher>
          )}
        </div>
        {!isInputValid && <h4 className="invalid">{alert}</h4>}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <CustomInput innerRef={ref} {...props} />
));
