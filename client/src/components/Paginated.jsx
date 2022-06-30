import React from "react";
import s from "./styles/Paginated.module.css";

export default function Paginated({
  pokemonsPerPage,
  allPokemons,
  paginado,
  currentPage,
}) {
  const numOfPages = [];

  for (let i = 0; i < Math.ceil(allPokemons.length / pokemonsPerPage); i++) {
    numOfPages.push(i + 1);
  }

  return (
    <div className={s.container}>
      <ul className={s.ul}>
        {numOfPages &&
          numOfPages.map((num) => (
            <li className={s.number} key={num}>
              <button
                className={currentPage === num ? s.numberBtn : s.btn}
                onClick={() => paginado(num)}
              >
                {num}
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}
