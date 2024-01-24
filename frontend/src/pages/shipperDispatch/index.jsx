import { useState, useEffect, useContext } from 'react'
import { Table, message, Space, Button, Popconfirm } from 'antd'
import style from './style.module.css'
import { shipperDispatched } from '../../apis/apiUrls'
import ShipperConext from '../../context/shipperContext'

export default function DispatchPage() {
    const {user} = useContext(ShipperConext)
    const [data, setData] = useState([])
    const [deliverers, setDeliverers] = useState([])
    const [centers, setCenters] = useState([])
    const [loading, setLoading] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [err, setErr] = useState("")
    const [nextDispatcherId,setNewDispatcherId] = useState("")
    const [delp_id,setDelpId] = useState("")

    const assignForDelivery = async (oid) => {
        const dp = deliverers.filter(i=>i.did==delp_id)
        console.log(dp);
        const res = await fetch(shipperDispatched + "?oid=" + oid+"&did="+delp_id+"&city="+dp[0].city, { method: "PATCH", headers:{authorization:localStorage.getItem("token")} })
        if (res.ok) {
            message.success("Sent for Delivery")
            const newData = data.filter(i => i.oid != oid)
            setData(newData)
        } else {
            message.error("Something went wrong")
        }
    }

    const dispathNext = async(oid)=>{
        const dis = centers.filter(i=>i.sid == nextDispatcherId)
        console.log(dis);
        const res = await fetch(shipperDispatched+"?oid="+oid+"&did="+dis[0].sid+"&city="+dis[0].city,{method:"POST",headers:{authorization:localStorage.getItem("token")}})
        if(res.ok){
            message.success("Dispatched to next successfully")
            const newData = data.filter(i=>i.oid!=oid)
            setData(newData)
        } else {
            message.error("Something went wrong")
        }
    }

    const getData = async () => {
        try {
            setLoading(p => !p)
            setIsErr(p => !p)
            setErr("")
            const res = await fetch(shipperDispatched, { method: "GET", headers:{authorization:localStorage.getItem("token")} })
            const d = await res.json()
            setData(d.data)
            setDeliverers(d.deliverypersons)
            setCenters(d.dispatchers)
            setLoading(p => !p)
        } catch (error) {
            setLoading(p => !p)
            setIsErr(p => !p)
            setErr(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const columns = [
        {
            title: "Package Id",
            dataIndex: "oid",
            align: "center",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Customer Name",
            dataIndex: "fullname",
            sorter: (a, b) => a.fullname.localeCompare(b.fullname)
        },
        {
            title: "Mobile",
            dataIndex: "mobile"
        },
        {
            title: "City",
            dataIndex: "city"
        },
        {
            title: "State",
            dataIndex: "state"
        },
        {
            title: "Payment Method",
            dataIndex: "payment_method",
            align: "center"
        },
        {
            title: "Payment Status",
            dataIndex: "payment_status",
            align: "center",
            render: (val) => (val == 0) ? "Pending" : "Paid"
        },
        {
            title: "Placed Date",
            dataIndex: "placedDate",
            align: "center",
            render: (val, record) => new Date(val).toLocaleDateString()
        },
        {
            title: "Actions",
            dataIndex: "",
            align:"center",
            render: (_, record) => {
                return (
                    <Space className={style.actionsSpace}>
                        <div>
                            <select className={style.selectMenu1} onInput={e=>setNewDispatcherId(e.target.value)}>
                                { centers.map(c=><option value={c.sid}>{c.center}</option>) }
                            </select>
                            <Popconfirm title="Press ok to confirm" onConfirm={() => { dispathNext(record.oid) }}>
                                <Button type="default" className={style.dispatch}>Dispatch</Button>
                            </Popconfirm>
                        </div>
                        <p style={{color:"black", fontWeight:"700"}}>OR</p>
                        <div>
                            <select className={style.selectMenu2} onInput={e=>setDelpId(e.target.value)}>
                                { deliverers.map(d=><option value={d.did}>{d.name}</option>) }
                            </select>
                            <Popconfirm title="Press ok to confirm" onConfirm={() => { assignForDelivery(record.oid) }}>
                                <Button type="primary" className={style.assign}>Assign Delivery</Button>
                            </Popconfirm>
                        </div>
                    </Space>
                )
            }
        },
    ]

    return (
        <Space>
            {(user.isShipper && user.isLoggedIn)?<Table
                style={{ width: "100vw" }}
                className={style.table}
                columns={columns}
                dataSource={data}
                bordered
                loading={loading}
            />:<h1>Unauthorised Access</h1>}
        </Space>
    )
}