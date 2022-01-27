import React from "react";

const SelectComponent = ({selectedOption,setSelectedOption,options})=>{
    const onChangeHandler = (e)=>{
        setSelectedOption(e.target.value)
    }
    return (
        <select className="btn-generic"  value={selectedOption} onChange={onChangeHandler}>
            {
                options.map((s,i)=><option key={i} value={s.value}>{s.label}</option>)
            }
        </select>
    )
}

export const Select = SelectComponent