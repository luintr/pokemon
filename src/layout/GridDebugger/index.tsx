'use client';
import useLocalStorage from '@Hooks/useLocalStorage';
import { useMediaQuery } from '@Hooks/useMediaQuery';
import { useEffect, useState } from 'react';

import s from './grid-debug.module.scss';

const GridDebugger = (): JSX.Element => {
  const [columns, setColumns] = useState(0);
  const [visible, setVisible] = useLocalStorage('isGrid', false);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const isTablet = useMediaQuery('(max-width: 1199px)');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setColumns(
        parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--layout-columns-count')
        )
      );
    }
  }, [isTablet, isMobile]);

  const handleToggleGrid = (e: KeyboardEvent): void => {
    const key = e.which || e.keyCode;
    const isShift = !!e.shiftKey;
    if (isShift && key === 71) {
      setVisible((visible) => !visible);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleToggleGrid);

      return () => {
        window.removeEventListener('keydown', handleToggleGrid);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <div className={s.grid}>
      {visible && (
        <div className={`${s.debugger} layout-grid`}>
          {new Array(columns).fill(0).map((_, key) => (
            <span key={key}></span>
          ))}
        </div>
      )}
    </div>
  );
};

export default GridDebugger;
