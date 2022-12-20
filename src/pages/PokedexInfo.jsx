import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./styles/pokedexinfo.css";

const PokedexInfo = () => {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState();

  useEffect(() => {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    axios
      .get(URL)
      .then((res) => setPokemon(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  return (
    <>
      <div className="pokeinfo-container">
        <img
          className="pokeinfo-img"
          src={pokemon?.sprites.other["official-artwork"].front_default}
          alt=""
        />{" "}
        <div className={`pokeinfo_bg bg-${pokemon?.types[0].type.name}`}></div>
      </div>
      <div className="pokeinfo">
        <div className="pokeinfo-data">
          <h1 className={`pokeinfo-name colo-${pokemon?.types[0].type.name}`}>
            {pokemon?.name}
          </h1>
          <h2 className="pokeinfo-id"># {pokemon?.id}</h2>
        </div>
        <ul className="pokeinfo-wyh">
          <li className="pokeinfo-weigth">
            <span className="pokeinfo-span">Weigth</span>
            <br />
            <span className="pokeinfoW-span">{pokemon?.weight}</span>
          </li>
          <li className="pokeinfo-height">
            <span className="pokeinfo-span">Height</span>
            <br />
            <span className="pokeinfoW-span">{pokemon?.height}</span>
          </li>
        </ul>
        <div className="pokeinfo-tya">
          <div className="pokeinfo-types">
            <h3 className="pokeinfo-text">Type</h3>
            <div className="pokeinfo-type">
              {pokemon?.types.map((type) => (
                <li
                  className={`pokeinfo-type_li bg-${pokemon?.types[0].type.name}`}
                  key={type.type.name}
                >
                  {type.type.name}
                </li>
              ))}
            </div>
          </div>
          <div className="pokeinfo-abilities">
            <h3 className="pokeinfo-text">Abilities</h3>
            <div className="poke-abilities">
              {pokemon?.abilities.map((ability) => (
                <li className="pokeinfo-ability" key={ability.ability.name}>
                  {ability.ability.name}
                </li>
              ))}
            </div>
          </div>
        </div>
        <div className="pokeinfo-container-stats">
          <div className="pokestats">
            <h2 className="pokeH2">Stats</h2>
            <div>
              <span className="pokeStats" key={pokemon?.types[0].type.name}>
                {pokemon?.stats.map((stat) => (
                  <span className="pokeH">
                    <li>{stat.stat.name}</li>
                    <span className={`color-${pokemon?.types[0].type.name}`}>
                      {stat.base_stat}
                    </span>
                  </span>
                ))}
              </span>
            </div>
          </div>

          <div className="pokemoves">movents</div>
          <div className="pokemovement">
            {pokemon?.moves.map((move) => (
              <li className="pokeli">{move.move.name}</li>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default PokedexInfo;
