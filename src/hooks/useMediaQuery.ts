import { useEffect, useState } from 'react';

/**
 * @name useMediaQuery
 * @description A React hook that detects whether a media query is true or false.
 * @param {string} queryString The media query to test against.
 * @returns {boolean} Whether the media query is true or false.
 */

export function useMediaQuery(queryString: string): boolean {
  const [isMatch, setIsMatch] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia(queryString);

    function onChange(): void {
      setIsMatch(mediaQuery.matches);
    }

    mediaQuery.addEventListener('change', onChange, false);
    onChange();

    return () => mediaQuery.removeEventListener('change', onChange, false);
  }, [queryString]);

  return isMatch;
}
