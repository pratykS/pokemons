import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import "./Details.css"
import { Accordion } from "../Accordion/Accordion";
const PokemonDetailsComponent = () => {
    const { pokemonId } = useParams();
    const [pokemonDetail, setPokemonDetail] = useState({});
    const [detailedObject, setDetailedObject] = useState({})

    useEffect(() => {
        const pokemons = JSON.parse(localStorage.getItem('pokemons'));
        const pokemonDetail = pokemons.find(p => p.id === Number(pokemonId));
        setPokemonDetail(pokemonDetail);

        const { id, name, height, weight, image, ...updatedObject } = pokemonDetail;
        setDetailedObject(updatedObject);

    }, [pokemonId])
    return (
        <>
            <div className="details-container">
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <section>
                        <Link className="white-link" to={`/`}>{"Back"}</Link>
                        {
                            pokemonDetail.name && (<h1 style={{ textAlign: 'center', color: '#EC625F' }}>{pokemonDetail.name.toUpperCase()}</h1>)
                        }

                        <img src={pokemonDetail.image} alt="pokemon-img"></img>
                        <div>
                            <ul className="stats">
                                <li>
                                    <span>Height</span>
                                    <h3>{`${pokemonDetail.height} m`}</h3>
                                </li>
                                <li>
                                    <span>Weight</span>
                                    <h3>{`${pokemonDetail.weight} kg`}</h3>
                                </li>
                            </ul>
                        </div>
                    </section>
                    <section style={{ width: '100%' }}>
                        {

                            Object.keys(detailedObject).map((o, i) => {
                                return (
                                    <Accordion key={i} title={o.toUpperCase()} content={{ property: o, data: detailedObject[o] }} />
                                )
                            })
                        }
                    </section>
                </div>
            </div>

        </>
    )
}

export const PokemonDetail = PokemonDetailsComponent