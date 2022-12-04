import "./App.css";
import {
  RecoilRoot,
  atom,
  selector,
  useSetRecoilState,
  useRecoilValue,
} from "recoil";
import { Suspense } from "react";

const pokemonListQuery = selector({
  key: "PokemonListQuery",
  get: async () => {
    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon?limit=30`)
    ).json();

    if (response.error) {
      throw response.error;
    }

    return response.results;
  },
});

const currentPokemonIDState = atom({
  key: "CurrentPokemonID",
  default: 1,
});

const pokemonInfoQuery = selector({
  key: "PokemonInfoQuery",
  get: async ({ get }) => {
    const pokemonID = get(currentPokemonIDState);

    const response = await (
      await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonID}`)
    ).json();

    if (response.error) {
      throw response.error;
    }

    return response;
  },
});

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <Suspense fallback={<div>Loading pokemon...</div>}>
          <PokemonInfo />
        </Suspense>
        <Suspense fallback={<div>Loading pokemon list...</div>}>
          <PokemonList />
        </Suspense>
      </div>
    </RecoilRoot>
  );
}

function PokemonInfo() {
  const currentPokemonInfo = useRecoilValue(pokemonInfoQuery);

  return (
    <div>
      <h3>{capitalizeFirstLetter(currentPokemonInfo.name)} Details</h3>
      <img src={currentPokemonInfo.sprites.front_default} />
    </div>
  );
}

function PokemonList() {
  const pokemonList = useRecoilValue(pokemonListQuery);
  const setCurrentPokemonID = useSetRecoilState(currentPokemonIDState);

  return (
    <div>
      {pokemonList.map((pokemon, i) => (
        <div
          key={pokemon.name}
          onClick={() => {
            setCurrentPokemonID(i + 1);
          }}
        >
          {capitalizeFirstLetter(pokemon.name)}
        </div>
      ))}
    </div>
  );
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
