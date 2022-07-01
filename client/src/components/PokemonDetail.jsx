import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getPokemonByID, getClean } from "../actions/index";

import s from "./styles/PokemonDetail.module.css";

export default function PokemonDetail() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const pokemon = useSelector((state) => state.detail);
  console.log(pokemon);

  useEffect(() => {
    dispatch(getPokemonByID(id));
    dispatch(getClean());
  }, [dispatch, id]);

  return (
    <div className={s.container}>
      <Link to="/home">
        <button className={s.btnHome}>Back to Home</button>
      </Link>

      {pokemon.id ? (
        <div className={s.card}>
          <div className={s.pokeName}>{pokemon.name}</div>
          <img className={s.pokeImg} src={pokemon.img} alt="Poke Image" />
          <div className={s.pokeDetails}>Pokemon Number: {pokemon.id}</div>
          <div className={s.pokeDetails}>Hp: {pokemon.hp}</div>
          <div className={s.pokeDetails}>Attack: {pokemon.attack}</div>
          <div className={s.pokeDetails}>Defense: {pokemon.defense}</div>
          <div className={s.pokeDetails}>Speed: {pokemon.speed}</div>
          <div className={s.pokeDetails}>Height: {pokemon.height}</div>
          <div className={s.pokeDetails}>Weight: {pokemon.weight}</div>
          
          {/* {pokemon.type.length} */}
          <div className={s.pokeDetails}>Type:</div>
          <div className={s.pokeDetails}>
            {pokemon.type?.map((el) => (
              <p className={s.pokemonTipos}>{el}</p>
            ))}
          </div>
        </div>
      ) : (
        <div className={s.div}>
          <p className={s.loading}>Loading...</p>
          <img
            className={s.pikachuR}
            src={"https://c.tenor.com/fSsxftCb8w0AAAAi/pikachu-running.gif"}
          />
        </div>
      )}
    </div>
  );
}
