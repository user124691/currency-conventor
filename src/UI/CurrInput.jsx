import React from "react"
import classes from "./CurrInput.module.css"

export default function CurrInput({children, value, onChange}){
    return(
        <input value={value} onChange={(e) => onChange(e.target.value)} className={classes.currInputStyle}>
            {children}
        </input>
    )
}