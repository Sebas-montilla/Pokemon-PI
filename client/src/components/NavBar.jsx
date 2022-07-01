import React from "react";
import { Link } from "react-router-dom";

import SearchBar from "./SearchBar";
import s from "./styles/NavBar.module.css";

export default function NavBar() {

  return (
    <nav>
      <ul className={s.navUl}>
        <li>
          <Link className={s.homeLink} to="/home">
            POKEMON
          </Link>
        </li>
        <li>
          <SearchBar />
        </li>
      </ul>
    </nav>
  );
}
