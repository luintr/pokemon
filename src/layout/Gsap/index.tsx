'use client';
import gsap from 'gsap';
import { useLayoutEffect } from 'react';
import Tempus from 'tempus';

import { CustomEase, DURATION } from './gsap';
import { ScrollTriggerConfig } from './scrollTrigger';

const GSAP = ({ scrollTrigger = true }: { scrollTrigger?: boolean }): JSX.Element | null => {
  useLayoutEffect(() => {
    CustomEase.create('woow', '0.36,0,0.12,1');
    gsap.config({
      nullTargetWarn: false,
      autoSleep: 60,
    });

    gsap.defaults({
      ease: 'woow',
      duration: DURATION,
    });

    gsap.ticker.lagSmoothing(0);
    gsap.ticker.remove(gsap.updateRoot);
    Tempus?.add((time) => {
      gsap.updateRoot(time / 1000);
    });
  }, []);

  return scrollTrigger ? <ScrollTriggerConfig /> : null;
};

export default GSAP;
