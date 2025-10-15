import { useEffect, useLayoutEffect } from 'react';

import { useLenis } from '../Lenis/lenis';
import { gsap, ScrollTrigger } from './gsap';

export const ScrollTriggerConfig = (): null => {
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.clearScrollMemory('manual');
  }, []);

  const lenis = useLenis(ScrollTrigger.update);

  useEffect(() => {
    ScrollTrigger.refresh();
  }, [lenis]);

  return null;
};
