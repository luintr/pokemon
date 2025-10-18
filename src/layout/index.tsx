'use client';

import useResetPage from '@Hooks/useResetPage';
import React from 'react';

import Header from './Header';
import LenisWrapper from './Lenis/LenisWrapper';
const Layout = ({ children }: { children: React.ReactNode }): JSX.Element => {
  useResetPage();
  return (
    <>
      {/* <Header /> */}
      <main>
        <LenisWrapper>{children}</LenisWrapper>
      </main>
    </>
  );
};

export default Layout;
