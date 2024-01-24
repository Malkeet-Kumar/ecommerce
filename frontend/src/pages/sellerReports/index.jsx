import { useEffect, useState } from 'react'
import style from './style.module.css'
import { Chart } from 'react-google-charts'
import { sellerReport } from '../../apis/apiUrls'
import { LuIndianRupee } from 'react-icons/lu'
import { useContext } from 'react'
import SellerContext from '../../context/sellerContext'

export default function SellerReport() {
    const [isUnauth, setUnauth] = useState(false)
    const [isErr,setIsError] = useState(false)
    const [error, setError] = useState("")
    const [loading,setLoading] = useState(false)
    const [data,setData] = useState(null)
    const [products,setProducts] = useState([])
    const [orders,setOrders] = useState([])
    const [sales,setSales] = useState(0)
    const [soldUnits, setSoldUnits] = useState([0,""])

    const {seller} = useContext(SellerContext)

    const getData = async()=>{
        try {
            setIsError(false)
            setError("")
            setLoading(true)
            const res = await fetch(sellerReport,{
                method:"GET",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                const data = await res.json()
                setProducts(data[0])
                setOrders(data[1])
                setSales(data[2])
                setSoldUnits(data[3])
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            setError(error)
            setIsError(true)
            console.log(error);
        }
    }

    const chartData = [["name","quantity"],...soldUnits.map(item => [item.name, Number(item.sold)])]

    useEffect(()=>{
        getData()
    },[])

    return (
        <>
            {seller.isLoggedIn?<>
            
            <div className={style.container1}>
                {products.map(t=>{
                    return <div className={style.card}>
                    <h2>{(t.isApproved==0)?"Rejected Products":(t.isApproved==1)?"Approved Products":"Approval Pending"}</h2>
                    <h1>{t.count}</h1>
                </div>
                })}
                {
                    orders.map(t=>{
                        if(t.statusCode==0 || t.statusCode==4 || t.statusCode==5){
                            return  <div className={style.card}>
                                    <h2>{t.statusCode==0?"New Orders":(t.statusCode==4)?"Orders Delivered":"Orders Cancelled"}</h2>
                                    <h1>{t.count}</h1>
                                </div>
                        } else {
                            return
                        }
                    })
                }
                
                <div className={style.card}>
                    <h2>Total sales</h2>
                    <h1 style={{display:"flex",alignItems:"center"}}>{sales[0]?.sales||0} <LuIndianRupee/></h1>
                </div>
                
            </div>
            <div className={style.container2}>
                <Chart chartType="PieChart" width="100%" height="400px" data={chartData} />
            </div>
            </>:
            <h1>Please Login to see Reports</h1>
            }
        </>
    )
}