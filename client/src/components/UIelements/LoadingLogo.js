import React, { useImperativeHandle, useState, useRef } from 'react';

import './LoadingLogo.css';
import Logo from './Logo';

const LoadingLogo = (props, ref) => {
  const [collapse, setCollapse] = useState(false);

  useImperativeHandle(
    ref,
    () => {
      return { setCollapse: async () => setCollapse(true) };
    },
    [collapse]
  );

  return (
    <div className={`loading-logo ${props.className}`}>
      <div className="loading-logo__logo" data-collapse={collapse}>
        <Logo />
      </div>
      <div
        className="loading-logo__progress-line"
        data-collapse={collapse}
      ></div>
    </div>
  );
};

// export default LoadingLogo;

// export default React.forwardRef((props, ref) => (
//   <LoadingLogo innerRef={ref} {...props} />
// ));
export default React.forwardRef(LoadingLogo);
