import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { postPokemon, getTypes } from "../actions/index";
import s from "./styles/PokemonCreate.module.css";

//first the validation function
function validation({
  name,
  hp,
  attack,
  defense,
  speed,
  weight,
  height,
  type,
}) {
  const errors = {};

  //validating name
  if (!name) {
    errors.name = "Enter Name ❌";
  } else if (!/^[a-zA-z\s]*$/.test(name)) {
    errors.name = "Characters are not allowed ❌";
  }

  //validating hp
  if (!hp || hp < 10 || hp > 200) {
    if (!hp) errors.hp = "Enter hp ❌";
    else if (hp <= 10) errors.hp = "hp must be higher than 10 ❌";
    else if (hp >= 200) errors.hp = "hp must be lower than 200 ❌";
  }

  //validating attack
  if (!attack || attack < 10 || attack > 200) {
    if (!attack) errors.hp = "Enter attack ❌";
    else if (attack <= 10) errors.attack = "attack must be higher than 10 ❌";
    else if (attack >= 200) errors.attack = "attack must be lower than 200 ❌";
  }

  //validating defense
  if (!defense || defense < 10 || defense > 200) {
    if (!defense) errors.defense = "Enter defense ❌";
    else if (defense <= 10)
      errors.defense = "defense must be higher than 10 ❌";
    else if (defense >= 200)
      errors.defense = "defense must be lower than 200 ❌";
  }

  //validating Speed
  if (!speed || speed < 10 || speed > 200) {
    if (!speed) errors.speed = "Enter speed ❌";
    else if (speed <= 10) errors.speed = "speed must be higher than 10 ❌";
    else if (speed >= 200) errors.speed = "speed must be lower than 200 ❌";
  }

  //validating weight
  if (!weight || weight < 10 || weight > 200) {
    if (!weight) errors.weight = "Enter weight ❌";
    else if (weight <= 10) errors.weight = "weight must be higher than 10 ❌";
    else if (weight >= 200) errors.weight = "weight must be lower than 200 ❌";
  }

  //validating height
  if (!height || height < 10 || height > 200) {
    if (!height) errors.height = "Enter height ❌";
    else if (height <= 10) errors.height = "height must be higher than 10 ❌";
    else if (height >= 200) errors.height = "height must be lower than 200 ❌";
  }

  //validating types
  if (!type.length) {
    errors.type = "Must choose a type ❌";
  } else if (type.length > 2) {
    errors.type = "You can only select two types ❌";
  }
  return errors
}

export default function PokemonCreate() {
  const dispatch = useDispatch();
  const history = useHistory();
  const types = useSelector((state) => state.getTypes);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  const [pokemon, setPokemon] = useState({
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    weight: 0,
    height: 0,
    img: "",
    type: [],
  });
  const { name, hp, attack, defense, speed, height, weight, img, type } =
    pokemon;
  console.log(pokemon)

  const handleChange = (e) => {
    e.preventDefault();
    setPokemon({
      ...pokemon,
      [e.target.name]: e.target.value,
    });
    setErrors(validation({
      ...pokemon,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelect = (e) => {
    e.preventDefault();
    if (type.length === 2) {
      alert("Two types is the limit");
    } else if (type.length < 2) {
      setPokemon({
        ...pokemon,
        type: [...type, e.target.value],
      });
    }
  };

  const handleDelete = (el) => {
    setPokemon({
      ...pokemon,
      type: pokemon.type.filter((e) => e !== el),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      hp.length === 0 ||
      attack.length === 0 ||
      defense.length === 0 ||
      speed.length === 0 ||
      height.length === 0 ||
      weight.length === 0 ||
      type.length === 0
    ) {
      alert("FILL IN THE BLANKS");
    } else if (
      hp < 10 ||
      attack < 10 ||
      defense < 10 ||
      speed < 10 ||
      height < 10 ||
      weight < 10 ||
      hp > 200 ||
      attack > 200 ||
      defense > 200 ||
      speed > 200 ||
      height > 200 ||
      weight > 200
    ) {
      alert("ONLY STATS BETWEEN 10 AND 200");
    } else if (
      /^[a-zA-Z\s]*$/.test(name) &&
      name.length &&
      hp.length &&
      // img.length &&
      attack.length &&
      defense.length &&
      speed.length &&
      height.length &&
      weight.length &&
      type.length
    ) {
      dispatch(postPokemon(pokemon));
      setPokemon({
        name: "",
        hp: 0,
        img: "",
        attack: 0,
        defense: 0,
        speed: 0,
        height: 0,
        weight: 0,
        type: [],
      });
      history.push("/home");
    }
  };

  return (
    <div className={s.container}>
      <Link to="/home">
        <button className={s.btnHome}>Back to home</button>
      </Link>
      <h1 className={s.intro}>Hello there, let's create a new Pokemon!</h1>
      <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.inputsPart}>
          {/* ------- NAME -------*/}
          <p>
            <label>Name: </label>
            <input
              className={s.input}
              type="text"
              placeholder="name"
              value={name}
              name="name"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
          </p>
          {/* ------- HP -------*/}
          <p>
            <label>Hp: </label>
            <input
              className={s.input}
              type="number"
              placeholder="health point"
              value={hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
          </p>
          {/* ------- ATTACK -------*/}
          <p>
            <label>Attack: </label>
            <input
              className={s.input}
              type="number"
              placeholder="attack"
              value={attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
          </p>
          {/* ------- DEFENSE -------*/}
          <p>
            <label>Defense: </label>
            <input
              className={s.input}
              type="number"
              placeholder="defense"
              value={defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
          </p>
          {/* ------- SPEED -------*/}
          <p>
            <label>Speed: </label>
            <input
              className={s.input}
              type="number"
              placeholder="speed"
              value={speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
          </p>
          {/* ------- WEIGHT -------*/}
          <p>
            <label>Weight: </label>
            <input
              className={s.input}
              type="number"
              placeholder="weight"
              value={weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
          </p>
          {/* ------- HEIGHT -------*/}
          <p>
            <label>Defense: </label>
            <input
              className={s.input}
              type="number"
              placeholder="height"
              value={height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
          </p>
          {/* ------- IMAGE -------*/}
          <p>
            <label>Image: </label>
            <input
              className={s.input}
              type="text"
              placeholder="image"
              value={img}
              name="img"
              onChange={(e) => handleChange(e)}
            />
          </p>
          <label>Types:</label>
          <select className={s.select} onChange={(e) => handleSelect(e)}>
            {types?.map((type) => (
              <option value={type.name} key={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <ul className={s.ul}>
            <li className={s.li} key={"key"}>
              {pokemon.type.map((el) => (
                <button
                  className={s.btnType}
                  type="button"
                  key={el.id}
                  onClick={() => handleDelete(el)}
                >
                  {el}
                </button>
              ))}
            </li>
          </ul>
          <div className={s.btnSubmit}>
            <button className={s.btnSub} type="submit">
              Create
            </button>
          </div>
        </div>
      </form>

      <div className={s.danger}>
        {errors.name && <p className={s.error}>{errors.name}</p>}
        {errors.hp && <p className={s.error}>{errors.hp}</p>}
        {errors.attack && <p className={s.error}>{errors.attack}</p>}
        {errors.defense && <p className={s.error}>{errors.defense}</p>}
        {errors.speed && <p className={s.error}>{errors.speed}</p>}
        {errors.height && <p className={s.error}>{errors.height}</p>}
        {errors.weight && <p className={s.error}>{errors.weight}</p>}
      </div>

    </div>
  );
}
