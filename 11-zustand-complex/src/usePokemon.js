import create from "zustand";

const usePokemonStore = create((set) => ({
  pokemonList: [],
  selectedPokemon: {},
  setSelectedPokemon: async (id) => {
    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    ).json();

    set((state) => ({ ...state, selectedPokemon: response }));
  },
  fetchPokemonList: async () => {
    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30`)
    ).json();

    set((state) => ({ ...state, pokemonList: response.results }));
  },
  fetchSinglePokemon: () => {},
}));

export default usePokemonStore;
