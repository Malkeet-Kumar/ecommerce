import { Table, message, Space,Popconfirm, Button } from "antd"
import { useContext, useEffect, useState } from "react"
import style from './style.module.css'
import { delivery, shipperOnboard } from "../../apis/apiUrls"
import ShipperConext from "../../context/shipperContext"

export default function OnBoarding() {
    const {user} = useContext(ShipperConext)
    const [onboarding, setOnboarding] = useState([])
    const [loading, setLoading] = useState(false)
    const [isErr, setIsErr] = useState(false)
    const [err, setErr] = useState("")

    const packageReceived=async(oid)=>{
        const res = await fetch(shipperOnboard+"?oid="+oid,{method:"POST",headers:{authorization:localStorage.getItem("token")}})
        if(res.ok){
            message.success("Package Recieved Successfully")
            const newData = onboarding.filter(i=>i.oid!=oid)
            setOnboarding(newData)
        } else {
            message.error("Something went wrong")
        }
    }

    const getData = async () => {
        try {
            setLoading(p => !p)
            setIsErr(p => !p)
            setErr("")
            const res = await fetch(shipperOnboard, { method: "GET",headers:{authorization:localStorage.getItem("token")}})
            const data = await res.json()
            setOnboarding(data)
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
            render: (_, record) => {
                return (
                    <Space>
                        <Popconfirm title="Press ok to confirm" onConfirm={() => { packageReceived(record.oid) }}>
                            <Button type="primary">Recive</Button>
                        </Popconfirm>
                    </Space>
                )
            }
        },
    ]

    return (
        <Space>
            {(user.isShipper && user.isLoggedIn)?<Table
                style={{width:"100vw"}}
                className={style.table}
                columns={columns}
                dataSource={onboarding}
                bordered
                loading={loading}
            />:<h1>Unauthorised Access</h1>}
        </Space>
    )
}