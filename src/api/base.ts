import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.API_BASE_URL || 'https://pokeapi.co/api/v2',
});

export const endpoints = {
  pokemon: {
    list: '/pokemon',
    detail: (id: number) => `pokemon/${id}`,
  },
  generation: {
    list: '/generation',
    detail: (id: number) => `generation/${id}`,
  },
  pokemonSpecies: {
    list: '/pokemon-species',
    detail: (id: number) => `pokemon-species/${id}`,
  },
  eggGroup: {
    list: '/egg-group',
    detail: (id: number) => `egg-group/${id}`,
  },
  evolutionChain: {
    list: '/evolution-chain',
    detail: (id: number) => `evolution-chain/${id}`,
  },
};