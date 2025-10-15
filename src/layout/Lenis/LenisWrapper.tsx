'use client';
import 'lenis/dist/lenis.css';

import { useRef } from 'react';
// eslint-disable-next-line import/no-unresolved
import { useTempus } from 'tempus/react';

import { ReactLenis } from './lenis';

function LenisWrapper({ children }: { children: React.ReactNode }): JSX.Element {
  const lenisRef = useRef<typeof ReactLenis>(null);

  useTempus((time) => {
    if (lenisRef.current?.lenis) {
      lenisRef.current.lenis.raf(time);
    }
  });

  return (
    <ReactLenis root options={{ lerp: 0.125, autoRaf: false }} ref={lenisRef}>
      {children}
    </ReactLenis>
  );
}

export default LenisWrapper;
