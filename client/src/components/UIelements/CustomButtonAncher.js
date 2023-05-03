import React from 'react';

import './CustomButtonAncher.css';

class CustomButtonAncher extends React.Component {
  render() {
    const { isAncher = false, icon = null, style, ...rest } = this.props;
    const element = React.createElement(
      `${isAncher == true ? 'a' : 'button'}`,
      {
        ...rest,
        style: { textAlign: 'center', cursor: 'pointer', ...style }
      }, //anchers need align, buttons need cursor pointer
      this.props.children
    );
    return element;
  }
}

export default CustomButtonAncher;
