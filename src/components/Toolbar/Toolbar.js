import React from "react";
import { Select } from "../Select/Select";
const ToolbarComponent = (props) => {

    const { onSearchHandler, searchTerm, nameSort, sortByName, heightSort, sortByHeight, weightSort, sortByWeight, selectedOption, setSelectedOption, selectOptions } = props

    return (
        <div className="toolbar">
            <input className="searchbar" onChange={onSearchHandler} placeholder="Search your favourite pokemon by name or ability" value={searchTerm}></input>
            <div className="buttonbar">

                <button className="btn-generic" onClick={sortByName}>Sort by name {nameSort ? '(A-Z)' : '(Z-A)'}</button>
                <button className="btn-generic" onClick={sortByHeight}>Sort by height {heightSort ? '(Low-High)' : '(High-Low)'}</button>
                <button className="btn-generic" onClick={sortByWeight}>Sort by weight {weightSort ? '(Low-High)' : '(High-Low)'}</button>
                <Select selectedOption={selectedOption} setSelectedOption={setSelectedOption} options={selectOptions}></Select>
            </div>
        </div>
    )
}

export const Toolbar = ToolbarComponent