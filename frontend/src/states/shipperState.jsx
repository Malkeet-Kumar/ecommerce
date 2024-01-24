import {useContext, useState} from 'react';
import ShipperContext from '../context/shipperContext'
import { defaultShipper } from '../utils/defaultStateVariables';
export default function ShipperState(props){
    const u = JSON.parse(localStorage.getItem("user"))
    const [user,setUser] = useState(u || defaultShipper)
    return(
        <ShipperContext.Provider value={{user,setUser}}>
            {props.children}
        </ShipperContext.Provider>
    )
}