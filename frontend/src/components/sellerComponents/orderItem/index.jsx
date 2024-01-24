import { useState, useEffect } from "react"
import { Table, Popconfirm, Button, Space, Form, Input, Upload, message } from 'antd'
import { DownloadOutlined, UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
const { Search } = Input;
import { useGetData } from '../../../apis/apiCalls'
import { productUrl, sellerDispatchCenter, sellerInventory, sellerOrders } from "../../../apis/apiUrls"
import style from './style.module.css'
import { useForm } from "antd/es/form/Form"
import { CSVLink } from 'react-csv'
import ImageCell from "../../imageCell";
import Alert from '../../sweetAlert'

export default function OrderTable({ isUnauth, isError, err, isLoading, data, setData, centers }) {
    const [formatdata, setFormatData] = useState([["Name", "Category", "Price", "Description", "Stock"]])
    const [searchData, setSearchData] = useState([])
    const [searchText, setSearchText] = useState("")
    const [warehouses, setWarehouses] = useState([])

    const [choosenCenter,setChoosenCenter] = useState(warehouses[0])

    async function acceptorder(oid) {
        try {
            const res = await fetch(sellerOrders + "?oid=" + oid, { method: "POST", headers:{authorization:localStorage.getItem("token")} })
            if (res.status == 200) {
                const indx = data.findIndex(i => i.o_id == oid)
                data[indx].statusCode = 1
                console.log(data[indx]);
                setData([...data])
                message.success("Order Accepted start packaging")
            }
            if (res.status == 304) {
                message.warning("Something went wrong !")
            }
            if (res.status == 401) {
                message.error("Unauthorised")
            }
        } catch (error) {
            Alert({
                title:"Error Occured",
                text:error,
                icon:"error",
                iconColor:"red"
            })
        }
    }

    async function dispatchOrder(oid) {
        if(!choosenCenter){
            message.warning("Please choose a center to dispatch")
            return
            // setChoosenCenter(warehouses[0])
        }
        try {
            const res = await fetch(sellerOrders + "?oid=" + oid+"&center_id="+choosenCenter || warehouses[0], { method: "PATCH", headers:{authorization:localStorage.getItem("token")} })
            // console.log(res);
            if(res.ok){
                const newData = data.filter(i=>i.o_id!=oid)
                setData(newData)
                message.success("Order Dispatched")
            } else {
                message.error("Something went wrong")
            }
        } catch (error) {
            console.log(error);
            Alert({
                title:"Error Occured",
                text:error,
                icon:"error",
                iconColor:"red"
            })
        }
    }

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            render: (url, record) => (
                <ImageCell src={url} alt={record.name}/>
            )
        },
        {
            title: "Item",
            dataIndex: "name",
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
            title: "Bill Amount",
            dataIndex: "billAmount",
            align: "center",
            sorter: (a, b) => a.billAmount > b.billAmount
        },
        {
            title: "Payment Method",
            dataIndex: "payment_method",
            align: "center",
        },
        {
            title: "Payment Status",
            dataIndex: "payment_status",
            align: "center",
            render: (val) => (val == 0) ? "Pending" : "Paid",
            sorter:(a,b)=> a.payment_status > b.payment_status
        },
        {
            title: "Status",
            dataIndex: "statusCode",
            align: "center",
            render: (val) => (val == 0) ? "Not Confirmed" :(val==1)? "Accepted" : "Dispatched",
            sorter:(a,b)=>a.statusCode>b.statusCode
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
                        {(record.statusCode == 0)
                            ?
                            <Popconfirm title="Press ok to confirm" onConfirm={() => { acceptorder(record.o_id) }}>
                                <Button type="primary">Accept</Button>
                            </Popconfirm>
                            :
                            (record.statusCode == 1)
                                ?
                                <div className={style.dispatchBtn}>
                                    <select onInput={e=>setChoosenCenter(e.target.value)}>
                                        {centers.map(c => <option value={c.cid}>{c.center}</option>)}
                                    </select>
                                    <Popconfirm title="Press ok to confirm" onConfirm={() => { dispatchOrder(record.o_id) }}>
                                        <Button>Dispatch</Button>
                                    </Popconfirm>
                                </div>
                                :
                                <p>Dispatched</p>
                        }
                    </Space>
                )
            }
        },
    ]

    const onSearch = (val) => {

    }

    return (
        <>
            <Space>
                <Table
                    className={style.table}
                    columns={columns}
                    dataSource={searchData && searchData.length > 0 ? searchData : data}
                    bordered
                    loading={isLoading}
                />
            </Space>
        </>
    )
}