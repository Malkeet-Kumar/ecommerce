import style from './style.module.css'
import ImageSlider from "./slider";
import { useEffect, useContext } from "react";
import { HOME_TITLE } from '../../utils/titles'
function Home() {
    useEffect(()=>{
        document.title = HOME_TITLE
    })
    return (
        <div className={style.homeContainer}>
            {/* <h1>{user.name}</h1> */}
           <ImageSlider/>
        </div>
    );
}

export default Home