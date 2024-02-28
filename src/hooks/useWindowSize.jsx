import React, { useLayoutEffect, useState } from 'react';
import { debounce } from 'lodash';

// set time in ms after which window size should be checked
const updateFrequency = 1000;

export function useWindowSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  useLayoutEffect(() => {
    const updateWidth = debounce(() => setWidth(window.innerWidth), updateFrequency, {
      maxWait: updateFrequency
    });

    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);
  return width;
}
