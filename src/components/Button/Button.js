import React from "react";

const ButtonComponent = (props)=>{
    const {onClickHandler,disabled,title,className} = props
    return(
        <button type="button" className={className} disabled={disabled} style={{cursor:disabled?'not-allowed':'pointer'}} onClick={onClickHandler}>{title}</button>
    )
}

export const Button = ButtonComponent