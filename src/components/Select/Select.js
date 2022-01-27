import React from "react";

const SelectComponent = ({seletedOption,setSelectedOption,options})=>{
    const onChangeHandler = (e)=>{
        setSelectedOption(e.target.value)
    }

    return (
        <select className="btn-generic"  value={seletedOption} onChange={onChangeHandler}>
            {
                options.map((s,i)=><option key={i} value={s.value}>{s.label}</option>)
            }
        </select>
    )
}

export const Select = SelectComponent