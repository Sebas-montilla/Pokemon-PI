import React from "react";
import Card from "./Card";
import NavBar from "./NavBar";
import Loading from "./Loading";
import Paginated from "./Paginated";
import { Link } from "react-router-dom";
import {
  getPokemons,
  getTypes,
  filterByType,
  filterCreated,
  filterAlphabetic,
  filterByAttack,
} from "../actions/index";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./styles/Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("");

  useEffect(() => {
    dispatch(getPokemons());
    dispatch(getTypes());
  }, [dispatch]);

  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.getTypes);
  console.log(allTypes);

  const [currentPage, setCurrentPage] = useState(1);
  const [pokemonsPerPage, setPokemonPerPage] = useState(12);
  const indexOfLastPokemon = currentPage * pokemonsPerPage;
  const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
  const currentPokemons = allPokemons.slice(
    indexOfFirstPokemon,
    indexOfLastPokemon
  );
  console.log(currentPokemons);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //Refresh and give me all pokemons
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(getPokemons());
    setCurrentPage(1);
    setOrder(e.target.value);
  };
  //Filter by Type----------------------------
  const handleSortType = (e) => {
    e.preventDefault();
    dispatch(filterByType(e.target.value));
    setCurrentPage(1);
  };
  //Filter by Attack----------------------------
  const handleSortAttack = (e) => {
    e.preventDefault();
    dispatch(filterByAttack(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };

  //Filter Alphabetic----------------------------
  const handleSortAlphabetic = (e) => {
    e.preventDefault();
    dispatch(filterAlphabetic(e.target.value));
    setCurrentPage(1);
    setOrder(`Ordenado ${e.target.value}`);
  };
  //Filter by Created in DB----------------------------
  const handleSortCreated = (e) => {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className={s.home}>
      <nav>
        <NavBar />
      </nav>

      <section className={s.filters}>
        <div className={s.selects}>
          <Link to="/create">
            <button className={s.orderAndFilter}>Create new Pokemon</button>
          </Link>

          <select
            className={s.orderAndFilter}
            onChange={(e) => handleSortAlphabetic(e)}
          >
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>

          <select
            className={s.orderAndFilter}
            onChange={(e) => handleSortAttack(e)}
          >
            <option value="fuer-asc">Ascending attack</option>
            <option value="fuer-desc">Descending attack</option>
          </select>

          <select
            className={s.orderAndFilter}
            onChange={(e) => handleSortCreated(e)}
          >
            <option value="" disabled selected>
              Created by
            </option>
            <option value="all">All</option>
            <option value="created">Data Base</option>
            <option value="api">Api</option>
          </select>

          <select
            className={s.orderAndFilter}
            onChange={(e) => handleSortType(e)}
          >
            <option value="" disabled selected>
              Filter by type
            </option>
            <option value="all">All</option>
            {allTypes &&
              allTypes.map((tipo) => (
                <option key={tipo.id} value={tipo.name}>
                  {tipo.name}
                </option>
              ))}
          </select>
        </div>
      </section>

      <section>
        <button className={s.btnRefresh} onClick={(e) => handleClick(e)}>
          Get all pokemons
        </button>
      </section>
      <section className={s.paginated}>
        <Paginated
          pokemonsPerPage={pokemonsPerPage}
          allPokemons={allPokemons}
          currentPage={currentPage}
          paginado={paginado}
        />
      </section>

      <div className={s.card}>
        {currentPokemons.length > 0 ? (
          currentPokemons.map((pokemon) => (
            <>
              <Link key={pokemon.id} to={`/pokemons/${pokemon.id}`}>
                <Card
                  key={pokemon.name}
                  name={pokemon.name}
                  img={
                    pokemon.img
                      ? pokemon.img
                      : "https://cdn.vox-cdn.com/thumbor/IhuPwFLVg19jF8B6rSmpy5T1-tY=/0x0:1920x1080/1400x788/filters:focal(807x387:1113x693):format(jpeg)/cdn.vox-cdn.com/uploads/chorus_image/image/53254027/who_pokemon.0.jpg"
                  }
                  type={pokemon.type}
                  // attack={pokemon.attack}
                />
              </Link>
            </>
          ))
        ) : (
          <>
            <Loading />
          </>              
        )}
      </div>
      {!currentPokemons.length ? (
        <div className={s.noti}>
          <h1 className={s.msg}>No pokemons available</h1>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
