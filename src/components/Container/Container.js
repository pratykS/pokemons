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

    const [searchTerm, setSearchTerm] = useState(() => {
        const saved = localStorage.getItem("searchTerm");
        return saved || "";
    });

    const [nameSort, toggleNameSort] = useState(false);
    const [heightSort, toggleHeightSort] = useState(false);
    const [weightSort, toggleWeightSort] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const initialURL = `${pokemonApiBaseUrl}?limit=${selectedOption}&offset=${0}`;
    const [url, setUrl] = useState(initialURL);

    useEffect(() => {
        setUrl(`${pokemonApiBaseUrl}?limit=${selectedOption}&offset=${0}`)
    }, [selectedOption])

    useEffect(() => {
        const fetchData = async () => {
            let response = await getAllPokemon(url)
            setNextUrl(response.next);
            setPrevUrl(response.previous);
            const pokemons = await loadPokemon(response.results);
            if (searchTerm && Boolean(searchTerm)) {
                const searchedPokemon = searchPokemons(searchTerm);
                setPokemonData(searchedPokemon)
            } else {
                setPokemonData(pokemons)
            }

            setLoading(false);
        }
        fetchData();
    }, [url, searchTerm])

    const next = async () => {
        setLoading(true);
        let data = await getAllPokemon(nextUrl);
        const pokemons = await loadPokemon(data.results);
        setPokemonData(pokemons);
        setSearchTerm('')
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
    }

    const prev = async () => {
        if (!prevUrl) return;
        setLoading(true);
        let data = await getAllPokemon(prevUrl);
        const pokemons = await loadPokemon(data.results);
        setPokemonData(pokemons);
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
        localStorage.setItem('pokemons', JSON.stringify(_filteredPokemonData))
        return _filteredPokemonData
    }

    const onChangeHandler = (e) => {
        setSearchTerm(e.target.value);
        localStorage.setItem('searchTerm', e.target.value);
    }

    const searchPokemons = (searchTerm) => {
        const pokemons = JSON.parse(localStorage.getItem('pokemons'));
        if (pokemons) {
            const searchedPokemonByName = pokemons.filter(p => p.name.includes(searchTerm))
            const searchedPokemonByAbilities = pokemons.filter((p) => p.abilities.some(a => a.ability.name.includes(searchTerm)));

            const combinedArrayOfPokemons = [...searchedPokemonByName, ...searchedPokemonByAbilities].reduce((acc, current) => {
                const x = acc.find((item) => item.name === current.name && item.id === current.id)

                if (!x) {
                    return acc.concat([current])
                } else {
                    return acc;
                }
            }, []);
            return combinedArrayOfPokemons
        }
    }

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
