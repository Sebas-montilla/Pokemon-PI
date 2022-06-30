import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokemonByName } from "../actions/index";
import s from "./styles/SearchBar.module.css";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getPokemonByName(name));
    setName("");
  };

  return (
    <div className={s.search}>
      <input
        className={s.inputSearch}
        type="text"
        placeholder="Search by name"
        onChange={(e) => handleInputChange(e)}
      />
      <button
        className={s.btnSearch}
        type="submit"
        onClick={(e) => handleSubmit(e)}
      >
        Search
      </button>
    </div>
  );
}
