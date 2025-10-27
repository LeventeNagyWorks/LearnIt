import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  small: 480,
  mobile: 768,
  tablet: 1024,
  desktop: 1440,
};

const useBreakpoint = (breakpoint = BREAKPOINTS.mobile) => {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [breakpoint]);

  return isMobile;
};

export default useBreakpoint;
