import { ScrollTrigger } from '@Layout/Gsap/gsap';
import { useLenis } from '@Layout/Lenis/lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const useResetPage = (): void => {
  const lenis = useLenis();
  const pathName = usePathname();
  // const { setMouseLeave } = useHoverStore();
  // const { resetTheme } = useThemeSignal();
  useEffect(() => {
    if (typeof window === 'undefined') return;
    window.history.scrollRestoration = 'manual';
    ScrollTrigger.clearScrollMemory('manual');
    // setMouseLeave();
    lenis?.scrollTo(0, { immediate: true });

    const timer = setTimeout(() => {
      // resetTheme();
    }, 10);

    return () => {
      clearTimeout(timer);
    };
  }, [pathName]);
};

export default useResetPage;
