import React from 'react';
import './style.css';
import { Link } from "react-router-dom"

function Card({ pokemon }) {

    return (
        <div className="p-card">
            <div className="character-area">
                <img height="auto" className="character" src={pokemon.image} alt="pokemon-img"/>
            </div>
            <div className="details">
                <h2>{pokemon.name.toUpperCase()}</h2>
            </div>
            <ul className="stats">
                <li>
                    <span>Height</span>
                    <h3>{`${pokemon.height} m`}</h3>
                </li>
                <li>
                    <span>Weight</span>
                    <h3>{`${pokemon.weight} kg`}</h3>
                </li>
                <li>
                    <span>Abilities</span>
                    {
                        pokemon.abilities.map((a,i)=> <span key={i} className="chip green"><b>{a.ability.name}</b></span>)
                    }
                </li>
            </ul>
            <button className="details-btn">
                <Link to={`/pokemon/${pokemon.id}`}>Show details</Link>
            </button>
        </div>
    );
}

export default Card;
