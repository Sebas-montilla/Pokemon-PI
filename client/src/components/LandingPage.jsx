import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setTypes } from "../actions/index";
import s from "./styles/LandingPage.module.css";

export default function LandingPage() {
  const dispatch = useDispatch();

  const handlePostTypes = (e) => {
    dispatch(setTypes());
  };

  return (
    <div className={s.landing}>
      <h1 className={s.title}>Pokemon PI</h1>
      <p className={s.intro}>
        Hello There! Welcome to this pokemon adventure, we will be searching for
        pokemons, so click the button below and let's begin!
      </p>
      <Link to="/home">
        <button className={s.button} onClick={handlePostTypes()}>
          Start!
        </button>
      </Link>
    </div>
  );
}
