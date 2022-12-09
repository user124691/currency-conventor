import React from "react"
import classes from "./CurrSelect.module.css"

export default function CurrSelect({options, value, onChange}){
    return(
        <select value={value} onChange={(event) => onChange(event.target.value)} className={classes.currSelectStyles}>
            {options.map(function(item){
                return <option key={item.value} value={item.value}>
                    {item.name}
                </option>
            })}
        </select>
    )
}