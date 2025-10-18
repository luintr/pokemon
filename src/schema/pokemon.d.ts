type PokemonDetailType = {
  id: number;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  japan_name: string;
  image: string; //sprites.other["official-artwork"].front_default
  region: string;
  types: string[];
  about: PokemonAboutType
  stats: PokemonStatsType
  evolution: PokemonEvolutionType[]
};

type PokemonAboutType = {
  species: string;
  height: number;
  weight: number;
  abilities: string[];
  breeding: {
    gender: {
      male: number;
      female: number;
    };
    eggGroups: string[];
  }
}

type PokemonStatsType = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
}

type PokemonEvolutionType = {
  id: number;
  name: string;
  image: string;
}

type GenerationType = {
  id: number;
  name: string;
}