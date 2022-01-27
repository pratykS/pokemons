import React from "react";

const MovesComponent = ({ moves }) => {
    return (
        <div>
            {
                moves.map((m,i) => {
                    return (
                        <div key={i} className="chip">{m}</div>
                    )
                })
            }
        </div>
    )
}
export const Moves = MovesComponent