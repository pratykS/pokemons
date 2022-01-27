import React, { useState, useEffect } from "react";
import { getAllPokemon, getPokemon } from "../../services/pokemon"
import Card from "../Card"
import "./Container.css";
import { Button } from "../Button/Button";
import { Toolbar } from "../Toolbar/Toolbar";

const options = [
    {
        label: "10 Pokemons",
        value: 10

    },
    {
        label: "20 Pokemons",
        value: 20

    },
    {
        label: "50 Pokemons",
        value: 50

    },
]

const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2/pokemon'

const PokemonListComponent = () => {
    const [pokemonData, setPokemonData] = useState([])
    const [nextUrl, setNextUrl] = useState('');
    const [prevUrl, setPrevUrl] = useState('');
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState('');

    const [nameSort, toggleNameSort] = useState(false);
    const [heightSort, toggleHeightSort] = useState(false);
    const [weightSort, toggleWeightSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const initialURL = `${pokemonApiBaseUrl}?limit=${selectedOption}&offset=${0}`;
    const [url, setUrl] = useState(initialURL)



    useEffect(() => {
        setUrl(`${pokemonApiBaseUrl}?limit=${selectedOption}&offset=${0}`)
    }, [selectedOption])

    useEffect(() => {
        const fetchData = async () => {
            let response = await getAllPokemon(url)
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            await loadPokemon(response.results);
            setLoading(false);
        }
        fetchData();
    }, [url])

    const next = async () => {
        setLoading(true);
        let data = await getAllPokemon(nextUrl);
        await loadPokemon(data.results);
        setSearchTerm('')
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await getAllPokemon(prevUrl);
        await loadPokemon(data.results);
        setSearchTerm('');
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const loadPokemon = async (data) => {
        let _pokemonData = await Promise.all(data.map(async pokemon => {
            let pokemonRecord = await getPokemon(pokemon)
            return pokemonRecord
        }));

        const _filteredPokemonData = _pokemonData.map(p => {
            return {
                id: p.id,
                name: p.name,
                height: p.height,
                weight: p.weight,
                abilities: p.abilities,
                moves: p.moves.map(m => m.move.name),
                image: p.sprites.other['official-artwork'].front_default,
                types: p.types
            }
        });

        setPokemonData(_filteredPokemonData);
        localStorage.setItem('pokemons', JSON.stringify(_filteredPokemonData))
    }

    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value);
    }

    useEffect(() => {
        const pokemons = JSON.parse(localStorage.getItem('pokemons'))
        const searchedPokemonByName = pokemons.filter(p => {
            return p.name.includes(searchTerm)
        })

        const searchedPokemonByAbilities = pokemons.map((pokemon) => {
            return { ...pokemon, abilities: pokemon.abilities.filter((a) => a.ability.name.includes(searchTerm)) }
        }).filter(pokemon => pokemon.abilities.length > 0);

        const combinedArrayOfPokemons = [...searchedPokemonByName, ...searchedPokemonByAbilities].reduce((acc, current) => {
            const x = acc.find((item) => item.name === current.name && item.id === current.id)
            if (!x) {
                return acc.concat([current])
            } else {
                return acc;
            }
        }, []);

        setPokemonData(combinedArrayOfPokemons);
    }, [searchTerm])

    const sortByName = () => {
        toggleNameSort(!nameSort)
        const pokemons = JSON.parse(localStorage.getItem('pokemons'))
        const sortedPokemons = pokemons.sort((a, b) => nameSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name));
        setPokemonData(sortedPokemons);
    }

    const sortByHeight = () => {
        toggleHeightSort(!heightSort)
        const pokemons = JSON.parse(localStorage.getItem('pokemons'));
        const sortedPokemons = pokemons.sort((a, b) => heightSort ? a.height - b.height : b.height - a.height);
        setPokemonData(sortedPokemons);
    }

    const sortByWeight = () => {
        toggleWeightSort(!weightSort)
        const pokemons = JSON.parse(localStorage.getItem('pokemons'));
        const sortedPokemons = pokemons.sort((a, b) => weightSort ? a.weight - b.weight : b.weight - a.weight);
        setPokemonData(sortedPokemons);
    }

    return (
        <>
            <div className="container">
                {loading ? <h1 style={{ textAlign: 'center' }}>Loading...</h1> : (
                    <>
                        <Toolbar
                            onSearchHandler={onChangeHandler}
                            searchTerm={searchTerm}
                            nameSort={nameSort}
                            sortByName={sortByName}
                            heightSort={heightSort}
                            sortByHeight={sortByHeight}
                            weightSort={weightSort}
                            sortByWeight={sortByWeight}
                            selectedOption={selectedOption}
                            setSelectedOption={setSelectedOption}
                            selectOptions={options}
                        ></Toolbar>
                        {
                            pokemonData && pokemonData.length > 0 ? (
                                <div style={{ marginTop: '80px' }}>
                                    <div className="btn">
                                        <Button disabled={!Boolean(prevUrl)} title={"Previous"} onClickHandler={prev}></Button>
                                        <Button disabled={!Boolean(nextUrl)} title={"Next"} onClickHandler={next}></Button>
                                    </div>
                                    <div className="grid-container">
                                        {pokemonData.map((pokemon, i) => {
                                            return <Card key={i} pokemon={pokemon} />
                                        })}
                                    </div>
                                    <div className="btn">
                                        <Button disabled={!Boolean(prevUrl)} title={"Previous"} onClickHandler={prev}></Button>
                                        <Button disabled={!Boolean(nextUrl)} title={"Next"} onClickHandler={next}></Button>
                                    </div>
                                </div>
                            ) : (
                                <div className="grid-container">
                                    <h1 style={{ color: 'white', textAlign: 'center' }}> Not Found </h1>
                                </div>
                            )
                        }

                    </>
                )}
            </div>
        </>
    )
}

export const PokemonList = PokemonListComponent