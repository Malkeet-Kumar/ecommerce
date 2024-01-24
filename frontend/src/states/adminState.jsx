import { useState } from "react";
import AdminContext from "../context/adminContext";
import {defaultAdmin} from '../utils/defaultStateVariables'
export default function AdminState(props){
    const admin = JSON.parse(localStorage.getItem("user"))
    const [user,setUser] = useState(admin||defaultAdmin)
    return (
        <AdminContext.Provider value={{user,setUser}}>
            {props.children}
        </AdminContext.Provider>
    )
}