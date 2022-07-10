import React from "react";
import { Link } from "react-router-dom";
import s from './styles/NotFound.module.css'



export default function Err(){
 return (

     <div className={s.container}>
         <div>
         <h1 className={s.text}>Error 404 Not found!</h1>
         <h2 className={s.text1}> There are no pokemons here, maybe you're looking in the wrong place. Go back to Home!</h2>
         </div>
        <div className={s.btnDiv}>
        <Link to="/home">
        <button className={s.btn}> Back to home</button>
        </Link>
        </div>
         {/* <img className={s.img} src={error} alt="img not found!" /> */}
     </div>
    
 )
}