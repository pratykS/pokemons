import React from "react";

const AbilityComponent = (props) => {
    const { ability } = props;
    return (
        <div>
            {
                ability.map((a,i) => {
                    return (
                        <div key={i} className="chip">{a.ability.name}</div>
                    )
                })
            }
        </div>
    )
}

export const Ability = AbilityComponent