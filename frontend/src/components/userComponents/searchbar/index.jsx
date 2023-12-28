import React from "react";
import { FaSearch } from "react-icons/fa";
import style from './style.module.css'
export default function SearchBar(props) {
    return (
        <>
        {console.log('object')}
            <div className={style.container} onClick={props.onClick}>
                <input type="text" placeholder="Looking for...."/>
                <FaSearch color="black" className={style.icon}/>
            </div>
        </>
    )
}
