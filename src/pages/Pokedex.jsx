import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Pagination from "../components/pokedex/Pagination";
import PokeCard from "../components/pokedex/PokeCard";
import "./styles/pokedex.css";

const Pokedex = () => {
  const { trainer } = useSelector((state) => state);
  const [pokemons, setPokemons] = useState();
  const [types, setTypes] = useState();
  const [typeSelected, setTypeSelected] = useState("All pokemons");
  const navigate = useNavigate();

  useEffect(() => {
    if (typeSelected !== "All pokemons") {
      axios
        .get(typeSelected)
        .then((res) => setPokemons(res.data.pokemon.map((e) => e.pokemon)))
        .catch((err) => console.log(err));
    } else {
      const URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=999999999";
      axios
        .get(URL)
        .then((res) => setPokemons(res.data.results))
        .catch((err) => console.log(err));
    }
  }, [typeSelected]);

  useEffect(() => {
    const URL = "https://pokeapi.co/api/v2/type";
    axios
      .get(URL)
      .then((res) => setTypes(res.data.results))
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const input = e.target.search.value.trim().toLowerCase();
    navigate(`/pokedex/${input}`);
  };

  const handleChange = (e) => {
    setTypeSelected(e.target.value);
    setPage(1);
  };

  const [page, setPage] = useState(1);
  const [pokeperpage, setPokeperpage] = useState(12);
  const initialPoke = (page - 1) * pokeperpage;
  const finalPoke = page * pokeperpage;
  const maxPage = pokemons && Math.ceil(pokemons.length / pokeperpage);

  return (
    <div>
      <h2 className="pokedex-container">
        <span className="pokedex-span">Welcome {trainer}, </span> here you can
        find your favorite pokemon
      </h2>
      <section className="pokedex-title">
        <form className="pokedex-form" onSubmit={handleSubmit}>
          <input
            className="pokedex-input"
            placeholder="Search your favotire pokemon"
            id="search"
            type="text"
          />
          <button className="pokedex-btn">Search</button>
        </form>
        <select className="pokedex-select" onChange={handleChange}>
          <option className="pokedex-option" value="All pokemons">
            All pokemons
          </option>
          {types?.map((type) => (
            <option key={type.url} value={type.url}>
              {type.name}
            </option>
          ))}
        </select>
      </section>

      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
      <div className="poke-container">
        {pokemons?.slice(initialPoke, finalPoke).map((poke) => (
          <PokeCard key={poke.url} url={poke.url} />
        ))}
      </div>
      <Pagination page={page} maxPage={maxPage} setPage={setPage} />
    </div>
  );
};

export default Pokedex;
