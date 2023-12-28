import React, { Children, useEffect } from "react";
import style from './style.module.css'
import { Pagination } from 'antd';
export default function ProductContainer(props) {
    return (
        <>
            <div className={style.container}>
                {
                    props.children
                }
            </div>
            <Pagination onChange={props.setCurrPage} defaultCurrent={props.currentPage} total={props.total} style={{textAlign:"center", marginBottom:"15px"}} />
        </>
    )
}