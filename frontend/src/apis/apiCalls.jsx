import { useEffect, useState } from "react";
import axios from "axios";

function useGetData(url,token,dependency){
    const [isUnauth,setUnauth] = useState(false)
    const [isError,setErrorStatus] = useState(false)
    const [loading,setLoading] = useState(false)
    const [err,setError] = useState("")
    const [data,setData] = useState([])

    useEffect(()=>{
        (async()=>{
            try {
                setErrorStatus(false)
                setError("")
                setLoading(true)
                const res = await fetch(url,{method:"GET",headers:{
                    authorization:token
                }})
                if(res.ok){
                    const data = await res.json()
                    setData(data)
                    setLoading(false)
                } else {
                    setUnauth(true)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                setErrorStatus(true)
                setError(error)
            }
        })()
    },[dependency])
    return [isUnauth,isError,err,loading,data,setData]
}

function useGetDataWithCount(url,item,page){
    const [isUnauth,setUnauth] = useState(false)
    const [isError,setErrorStatus] = useState(false)
    const [isLoading,setLoading] = useState(false)
    const [err,setError] = useState("")
    const [data,setData] = useState([])
    const [count,setCount] = useState(1)

    useEffect(()=>{
        (async()=>{
            try {
                setErrorStatus(false)
                setError("")
                setLoading(true)
                const res = await fetch(url+"items="+item+"&page="+page,{method:"GET",credentials:"include"})
                if(res.ok){
                    const data = await res.json()
                    setData(data.products)
                    setCount(data.count)
                    setLoading(false)
                } else {
                    setUnauth(true)
                    setLoading(false)
                }
            } catch (error) {
                setLoading(false)
                setErrorStatus(true)
                setError(error)
            }
        })()
    },[item,page])
    return [isUnauth,isError,err,isLoading,count,data,setData]
}

export {
    useGetData,
    useGetDataWithCount
}