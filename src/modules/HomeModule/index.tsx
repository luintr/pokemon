'use client';

import TypoBody from '@Components/Typography/Body';
import { useDominantColor } from '@Hooks/useDominantColor';
import React from 'react';

import { usePokeContext } from '@Api/store';
import s from './style.module.scss';

const HomeModule = (): JSX.Element => {
  const { state, nextPokemon, prevPokemon, setState } = usePokeContext();
  const [inputId, setInputId] = React.useState(state.selectedId.toString());

  console.log(state.pokeData)

  // Get dominant color from processed image
  const dominantColor = useDominantColor(state.pokeData?.image || undefined);

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputId(value);
  };

  // Handle input submit
  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = parseInt(inputId);
    if (newId >= 1 && newId <= state.total) {
      setState({
        ...state,
        selectedId: newId
      });
    } else {
      // Reset to current ID if invalid
      setInputId(state.selectedId.toString());
    }
  };

  // Update input when selectedId changes from navigation
  React.useEffect(() => {
    setInputId(state.selectedId.toString());
  }, [state.selectedId]);

  return (
    <div className={`${s.home}`}>
      <section 
        className={s.section1}
        style={{
          backgroundColor: dominantColor || 'var(--primary-maroon)',
          transition: 'background-color 0.3s var(--primary-ease)',
        }}
      >
        {/* Navigation buttons */}
        <div className={s.navigation}>
          <button 
            className={s.navButton} 
            onClick={prevPokemon}
            aria-label="Previous Pokemon"
          >
            ←
          </button>
          
          <form onSubmit={handleInputSubmit} className={s.idInputForm}>
            <input
              type="number"
              value={inputId}
              onChange={handleInputChange}
              className={s.idInput}
              min="1"
              max={state.total}
              placeholder="ID"
            />
            <span className={s.pokemonId}>
              #{state.selectedId.toString().padStart(3, '0')}
            </span>
          </form>
          
          <button 
            className={s.navButton} 
            onClick={nextPokemon}
            aria-label="Next Pokemon"
          >
            →
          </button>
        </div>

        <img src={state.pokeData?.image || ''} alt={state.pokeData?.name || ''}/>
        <TypoBody tag="h1" size={30} className={`${s.section1_title}`}>
          {state.pokeData?.name}
        </TypoBody>
      </section>
    </div>
  );
};

export default HomeModule;
