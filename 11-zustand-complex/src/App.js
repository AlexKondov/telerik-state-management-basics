import { useEffect } from "react";
import usePokemon from "./usePokemon";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <PokemonInfo />
      <PokemonList />
    </div>
  );
}

function PokemonInfo() {
  const { selectedPokemon } = usePokemon();

  if (!selectedPokemon.name) {
    return null;
  }

  return (
    <div>
      <h3>{capitalizeFirstLetter(selectedPokemon.name)} Details</h3>
      <img src={selectedPokemon.sprites.front_default} />
    </div>
  );
}

function PokemonList() {
  const { pokemonList, fetchPokemonList, setSelectedPokemon } = usePokemon(
    (state) => ({
      pokemonList: state.pokemonList,
      fetchPokemonList: state.fetchPokemonList,
      setSelectedPokemon: state.setSelectedPokemon,
    })
  );

  useEffect(() => {
    fetchPokemonList();
  }, []);

  return (
    <div>
      {pokemonList.map((pokemon, i) => (
        <div
          key={pokemon.name}
          onClick={() => {
            setSelectedPokemon(i + 1);
          }}
        >
          {capitalizeFirstLetter(pokemon.name)}
        </div>
      ))}
    </div>
  );
}

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
