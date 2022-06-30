import React from "react";
import s from "./styles/Card.module.css";

export default function Card({ name, img, type }) {
  return (
    <div className={s.card}>
      <h2 className={s.name}>{name}</h2>
      <div>
        <img className={s.img} src={img} alt='Pokemon' />
      </div>
      <div className={s.types}>
        {type.map((type) => (<h5 className={s.cardType}>{type}</h5>))}
      </div>
    </div>
  );
}
