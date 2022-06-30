import React from "react";
import s from "./styles/Loading.module.css";

export default function Loading() {
  return (
    <div className={s.loading}>
      <img src={'./styles/resources/pikachu-running.gif'} alt='Loading' />
      <div className={s.text}>No Pokemons available</div>
    </div>
  );
}
