"use client";
import {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useMemo,
    useState,
    useEffect,
    useCallback,
} from "react";
import _ from "lodash";
import { api, endpoints } from "./base";
import { GENERATION_REGION_MAP, detectIdFromUrl, getEvolutionData } from "@Utils/utils";

type StoreType = {
    total: number;
    selectedId: number;
    generations: number[];
    pokeData: PokemonDetailType | null;
};

type ContextType = {
    state: StoreType;
    setState: (state: StoreType) => void;
};

const initialState: StoreType = {
    total: 892,
    selectedId: 1,
    generations: [],
    pokeData: null,
};

export const PokeContext = createContext<ContextType>({
    state: initialState,
    setState: _.noop as Dispatch<SetStateAction<StoreType>>,
} as ContextType);

export const PokeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
    const [state, setState] = useState<StoreType>(initialState);

    const getTotalCount = useCallback(async () => {
        try {
            const response = await api.get(`${endpoints.pokemon.list}?limit=10`);
            const totalCount = response.data.count;

            setState((prevState) => ({
                ...prevState,
                total: totalCount,
            }));
        } catch (error) {
            console.error("Error fetching Pokemon count:", error);
            return 0;
        }
    }, []);

    const getPokmonData = useCallback(
        async (id: number) => {
            try {
                const pokeResponse = await api.get(`${endpoints.pokemon.detail(id)}`);
                console.log("pokeResponse", pokeResponse.data);

                const speciesResponse = await api.get(`${endpoints.pokemonSpecies.detail(id)}`);
                console.log("speciesResponse", speciesResponse.data);

                const evolutionChainId = detectIdFromUrl(speciesResponse.data.evolution_chain.url);
                const evolutionChainResponse = await api.get(
                    `${endpoints.evolutionChain.detail(evolutionChainId)}`
                );
                console.log("evolutionChainResponse", evolutionChainResponse.data.chain);

                // Get evolution data
                const evolutionData = await getEvolutionData(evolutionChainResponse.data.chain);

                setState((prevState) => ({
                    ...prevState,
                    pokeData: {
                        id: id,
                        name: pokeResponse.data.name,
                        is_legendary: speciesResponse.data.is_legendary,
                        is_mythical: speciesResponse.data.is_mythical,
                        japan_name:
                            speciesResponse.data.names.find(
                                (name: any) => name.language.name === "ja"
                            )?.name || "",
                        image: pokeResponse.data.sprites.other["official-artwork"].front_default,
                        region: GENERATION_REGION_MAP[speciesResponse.data.generation["name"]],
                        types: pokeResponse.data.types.map((type: any) => type.type.name),
                        about: {
                            species: speciesResponse.data.name,
                            height: pokeResponse.data.height,
                            weight: pokeResponse.data.weight,
                            abilities: pokeResponse.data.abilities.map(
                                (ability: any) => ability.ability.name
                            ),
                            breeding: {
                                gender: {
                                    male: 100 - speciesResponse.data.gender_rate * 12.5,
                                    female: speciesResponse.data.gender_rate * 12.5,
                                },
                                eggGroups: speciesResponse.data.egg_groups.map(
                                    (eggGroup: any) => eggGroup.name
                                ),
                            },
                        },
                        stats: {
                            hp: pokeResponse.data.stats[0].base_stat,
                            attack: pokeResponse.data.stats[1].base_stat,
                            defense: pokeResponse.data.stats[2].base_stat,
                            specialAttack: pokeResponse.data.stats[3].base_stat,
                            specialDefense: pokeResponse.data.stats[4].base_stat,
                            speed: pokeResponse.data.stats[5].base_stat,
                            total: pokeResponse.data.stats.reduce(
                                (acc: number, curr: any) => acc + curr.base_stat,
                                0
                            ),
                        },
                        evolution: evolutionData,
                    },
                }));
            } catch (error) {
                console.error("Error fetching Pokemon data:", error);
            }
        },
        [setState]
    );

    const initialData = useCallback(async () => {
        await getTotalCount();
        await getPokmonData(state.selectedId);
    }, [getTotalCount, getPokmonData]);

    // Fetch total count when component mounts
    useEffect(() => {
        initialData();
    }, []);

    const value = useMemo<ContextType>(
        () => ({
            state,
            setState,
        }),
        [state]
    );
    return <PokeContext.Provider value={value}> {children} </PokeContext.Provider>;
};

export const usePokeContext = () => useContext(PokeContext);
