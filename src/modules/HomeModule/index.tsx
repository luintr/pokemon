'use client';

import TypoBody from '@Components/Typography/Body';
import React from 'react';
import { useRemoveBackground } from '@Hooks/useRemoveBackground';
import { useDominantColor } from '@Hooks/useDominantColor';

import s from './style.module.scss';
import { usePokeContext } from '@Api/store';
import Image from 'next/image';

const HomeModule = (): JSX.Element => {
  const { state } = usePokeContext();

  console.log(state.pokeData)

  // Get dominant color from processed image
  const dominantColor = useDominantColor(state.pokeData?.image || undefined);

  return (
    <div className={`${s.home}`}>
      <section 
        className={s.section1}
        style={{
          backgroundColor: dominantColor || 'var(--primary-maroon)',
        }}
      >
        <img src={state.pokeData?.image || ''} alt={state.pokeData?.name || ''}/>
        <TypoBody tag="h1" size={30} className={`${s.section1_title}`}>
          {state.pokeData?.name}
        </TypoBody>
      </section>
    </div>
  );
};

export default HomeModule;
