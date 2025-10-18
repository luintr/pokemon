export const GENERATION_REGION_MAP: Record<string, string> = {
  "generation-i": "Kanto",
  "generation-ii": "Johto",
  "generation-iii": "Hoenn",
  "generation-iv": "Sinnoh",
  "generation-v": "Unova",
  "generation-vi": "Kalos",
  "generation-vii": "Alola",
  "generation-viii": "Galar",
  "generation-ix": "Paldea",
};

export const detectIdFromUrl = (url: string): number => {
  // Remove trailing slash and split
  const parts = url.replace(/\/$/, '').split('/');
  const id = parts[parts.length - 1];
  return id ? parseInt(id) : 0;
};


export const getImageFromUrl = (url: string): string => {
  // try {
  //   const id = detectIdFromUrl(url);
  //   const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //   const data = await response.json();
  //   return data.sprites.other["official-artwork"].front_default;
  // } catch (error) {
  //   console.error('Error fetching Pokemon image:', error);
  //   // // Fallback to hardcoded URL if API fails
  //   // const id = detectIdFromUrl(url);
  //   // return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  //   return '';
  // }

  const id = detectIdFromUrl(url);
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
};


export const getEvolutionData = async (evolutionChain: any): Promise<PokemonEvolutionType[]> => {
  const evolutionData: PokemonEvolutionType[] = [];
  const processedIds = new Set<number>();

  // Helper function to recursively process evolution chain
  const processChain = async (chain: any) => {
    if (!chain) return;

    const pokemonId = detectIdFromUrl(chain.species.url);

    // Only add if not already processed (avoid duplicates)
    if (!processedIds.has(pokemonId)) {
      const image = getImageFromUrl(chain.species.url);
      evolutionData.push({
        id: pokemonId,
        name: chain.species.name,
        image: image,
      });
      processedIds.add(pokemonId);
    }

    // Process all evolution paths (not just the first one)
    if (chain.evolves_to && chain.evolves_to.length > 0) {
      for (const evolution of chain.evolves_to) {
        await processChain(evolution);
      }
    }
  };

  await processChain(evolutionChain);
  return evolutionData;
};

export const formatHeight = (height: number): string => {
  const meters = height / 10;
  const totalInches = meters * 39.3701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return `${meters.toFixed(1)} m (${feet}′${inches}″)`;
}

export const formatWeight = (weight: number): string => {
  const kilograms = weight / 10;
  const pounds = kilograms * 2.20462;
  return `${kilograms.toFixed(1)} kg (${pounds.toFixed(1)} lbs)`;
}