import React, { useState } from 'react';
import { Ability } from '../PokemonDetailsComponent/Ability/Ability';
import { Moves } from "../PokemonDetailsComponent/Moves/Moves";
import { Types } from "../PokemonDetailsComponent/Types/Types";
import "./Accordion.css"

const AccordionComponent = ({ title, content }) => {
    const [isActive, setIsActive] = useState(true);
    return (
        <div className="accordion-item">
            <div className="accordion-title" onClick={() => setIsActive(!isActive)}>
                <div>{title}</div>
                <div>{isActive ? '-' : '+'}</div>
            </div>
            {isActive && content.property === 'abilities' && (
                <div className='accordion-content'>
                    <Ability ability={content.data}></Ability>
                </div>
            )}
            {isActive && content.property === 'moves' && (
                <div className='accordion-content'>
                    <Moves moves={content.data}></Moves>
                </div>
            )}
            {isActive && content.property === 'types' && (
                <div className='accordion-content'>
                    <Types types={content.data}></Types>
                </div>
            )}
        </div>
    );
};

export const Accordion = AccordionComponent