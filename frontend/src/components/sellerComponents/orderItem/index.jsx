import { useState, useEffect } from "react"
import { Table, Popconfirm, Button, Space, Form, Input, Upload, message } from 'antd'
import { DownloadOutlined, UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
const { Search } = Input;
import { useGetData } from '../../../apis/apiCalls'
import { productUrl, sellerDispatchCenter, sellerInventory, sellerOrders } from "../../../apis/apiUrls"
import style from './style.module.css'
import { useForm } from "antd/es/form/Form"
import { CSVLink } from 'react-csv'

export default function OrderTable({ isUnauth, isError, err, isLoading, data, setData, centers }) {
    const [formatdata, setFormatData] = useState([["Name", "Category", "Price", "Description", "Stock"]])
    const [searchData, setSearchData] = useState([])
    const [searchText, setSearchText] = useState("")
    const [warehouses, setWarehouses] = useState([])

    const [choosenCenter,setChoosenCenter] = useState("")

    async function acceptorder(oid) {
        try {
            const res = await fetch(sellerOrders + "?oid=" + oid, { credentials: "include", method: "POST" })
            if (res.status == 200) {
                message.success("Order Accepted start packaging")
                const indx = data.findIndex(i => i.o_id == oid)
                data[indx].statusCode = 1
                console.log(data[indx]);
                setData([...data])
            }
            if (res.status == 304) {
                message.warning("Something went wrong !")
            }
            if (res.status == 401) {
                message.error("Unauthorised")
            }
        } catch (error) {
            message.error(error)
        }
    }

    async function dispatchOrder(oid) {
        message.success(oid+" "+choosenCenter)
        const res = await fetch(sellerOrders + "?oid=" + oid+"&center_id="+choosenCenter, { method: "PATCH", credentials: "include" })
    }

    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            render: (url, record) => (
                <img className={style.imageCell} alt={url} src={(url.includes("http")) ? url : "http://127.0.0.1:8000/uploads/productImages/" + url} key={record.p_id} />
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
            sorter: (a, b) => a.price > b.price
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
            title: "Status",
            dataIndex: "statusCode",
            align: "center",
            render: (val) => (val == 0) ? "Not Confirmed" :(val==1)? "Accepted" : "Dispatched"
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