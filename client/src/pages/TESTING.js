import React from 'react';
import debounce from 'lodash.debounce';

const showNumber = () => {
  console.log('TESTING - number');
};

const Testing = () => {
  const debouncedFunc = debounce(() => showNumber(), 1000);
  return (
    <div>
      <h1>debounce:</h1>
      <button onClick={() => debouncedFunc()}>BUTTON</button>
    </div>
  );
};

export default Testing;
