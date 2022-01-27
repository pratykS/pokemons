import React from "react";

const TypesComponent = ({ types }) => {
    return (
        <div>
            {
                types.map((t,i)=> {
                    return (
                        <div key={i} className="chip">
                            {
                                t.type.name
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}
export const Types = TypesComponent