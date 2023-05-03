import React from 'react';
import { BiSearchAlt2 } from 'react-icons/bi';

import './GenericInput.css';

class GenericInput extends React.Component {
  //props: onChange, isInputValid, value, ref for focus, type
  // componentDidUpdate() {
  //   const elements = document.getElementsByClassName('preload');
  //   console.log(elements.length);
  //   setTimeout(() => {
  //     for (let i = 0; i < elements.length; i++) {
  //       elements[i].classList.remove('preload');
  //     }
  //   }, 300); /*with the animation, the navbar is wider at the beginning so if we take down the 'preload' before
  //   the animation is done, it will be noticed on the screen, so we wait for the animaiton to finish*/
  // }

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
      <div className="generic-input ">
        {rest.label && (
          <label className="generic-input__label" htmlFor={rest.id}>
            {rest.label}
          </label>
        )}
        <div className="generic-input__div">
          <input
            ref={innerRef}
            className={`input generic-input__input ${
              isInputValid ? '' : 'invalid'
            }`}
            type={
              rest.id !== 'password'
                ? type
                : showPassword === true
                ? 'text'
                : 'password'
            }
            onClick={(e) => {
              e.stopPropagation();
            }}
            {...rest}
          />
          {this.props.id === 'password' && (
            <button
              className="generic-input__button"
              onClick={this.props.onClick}
            >
              {showPassword === true ? 'Hide' : 'Show'}
            </button>
          )}
          {this.props.id === 'search' && (
            <div className="generic-input__icon">
              <BiSearchAlt2 />
            </div>
          )}
        </div>
        {!isInputValid && <h4 className="invalid">{alert}</h4>}
      </div>
    );
  }
}

export default React.forwardRef((props, ref) => (
  <GenericInput innerRef={ref} {...props} />
));
