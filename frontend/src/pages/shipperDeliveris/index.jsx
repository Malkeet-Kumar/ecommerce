import { Table, message, Space, Button, Popconfirm } from 'antd'
import { useContext, useEffect, useState } from 'react'
import ShipperConext from '../../context/shipperContext'
import { delivery, shipperDispatched } from '../../apis/apiUrls'

export default function Deliveries(props) {
    const { user } = useContext(ShipperConext)
    const [loading, setLoading] = useState(false)
    const [isError, setIsError] = useState(false)
    const [error, setError] = useState("")
    const [data,setData] = useState([])

    const getData = async()=>{
        if(!user.isLoggedIn || !user.isDeliver){
            return
        }
        try {
            setLoading(true)
            setIsError(false)
            setError("")
            const res = await fetch(delivery,{
                method:"GET",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                const data = await res.json()
                setData(data)
            } else {
                message.error("Something went wrong")
            }
            setLoading(false)
        } catch (error) {
            message.error(error)
        }
    }
    
    useEffect(()=>{getData()},[])

    const markDelivered = async (pid) => {
        try {
            setLoading(p => !p)
            setError("")
            setIsError(p => !p)
            const res = await fetch(delivery+"?pid="+pid,{
                method:"POST",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                message.success("Package Delivered")
                const newData = data.filter(t=>t.oid!=pid)
                setData(newData)
            } else {
                message.warning("Something went wrong")
            }
            setLoading(false)
        } catch (error) {
            message.error(error)
            setLoading(false)
        }
    }
    const cols = [
        {
            title: "PackageId",
            dataIndex: "oid",
            align: "center"
        },
        {
            title: "Name",
            dataIndex: "name",
            align: "center"
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            align: "center"
        },
        {
            title:"Address",
            dataIndex:"",
            align:"center",
            render:(val,record)=>{
                return <>{record.name} M.No. {record.mobile} add: {record.add1}, {record.add2}, {record.city}, {record.pincode}</>
            }
        },
        {
            title:"Payment Mode",
            dataIndex:"payment_method",
            align:"center"
        },
        {
            title:"Payment Status",
            dataIndex:"payment_status",
            align:"center",
            render:(val)=>(val)?"Done":"Pending"
        },
        {
            title: "Actions",
            dataIndex: "",
            align: "center",
            render: (val, record) => {
                return (
                    <Popconfirm onConfirm={() => { markDelivered(record.oid) }}>
                        <Button>Deliver</Button>
                    </Popconfirm>
                )
            }
        },
    ]
    return (
        <>
            {(user.isDeliver && user.isLoggedIn) ?
            <
                Table
                columns={cols}
                dataSource={data}
            />:<h1>Unauthorised Access</h1>}
        </>
    )
}