import React from "react";
import style from './style.module.css'
import { helix } from 'ldrs'
helix.register("my-loader")

export default function Loading(){
    return (
        <div className={style.container}>
            <my-loader
                size="150"
                speed="2.5"
                color="crimson"
            ></my-loader>
            <h1>Please wait while we are loading....</h1>
        </div>
    )
}