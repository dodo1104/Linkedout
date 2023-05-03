import { useEffect } from 'react';

const useDebounce = (input, delay = 500, func) => {
  useEffect(() => {
    //debounce with js closure
    if (!input.length) return;
    const timeout = setTimeout(() => {
      func(input);
    }, delay);
    return () => clearTimeout(timeout);
  }, [input]);
};

export default useDebounce;
