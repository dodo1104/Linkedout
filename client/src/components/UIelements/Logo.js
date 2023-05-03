import React from 'react';

import './Logo.css';

class Logo extends React.Component {
  render() {
    const { isShort = false, ...rest } = this.props;
    return (
      <div className="logo">
        <a href="/login" {...rest}>
          <span>
            <span className={`${isShort ? 'dis-hidden' : ''}`}>Linked</span>
            <span className="logo__suffix">in</span>
          </span>
        </a>
      </div>
    );
  }
}

export default Logo;
