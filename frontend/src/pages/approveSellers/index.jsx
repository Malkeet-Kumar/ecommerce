import style from './style.module.css'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import { useGetData } from '../../apis/apiCalls'
import { adminSellerReq } from '../../apis/apiUrls'

export default function ApproveSeller() {
    const [isUnauth, isError, err, loading, data, setData] = useGetData(adminSellerReq, localStorage.getItem("token"))

    const approve = async(sid)=>{
        try {
            const res = await fetch(adminSellerReq+"?sid="+sid,{
                method:"POST",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                message.success("Seller request approved")
            } else {
                message.warning("Somthing went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const decline = async(sid)=>{
        try {
            const res = await fetch(adminSellerReq+"?sid="+sid,{
                method:"DELETE",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                message.success("Seller request rejected")
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const showDetails = ()=>{

    }

    const cols = [
        {
            title: "Buisness Name",
            dataIndex: "buisness",
            align: "center"
        },
        {
            title: "Seller Name",
            dataIndex: "",
            align: "center",
            render: (_, record) => {
                return <span>{record.fname} {record.lname}</span>
            }
        },
        {
            title: "City",
            dataIndex: "city",
            align: "center"
        },
        {
            title: "Country",
            dataIndex: "country",
            align: "center"
        },
        {
            title: "GST No.",
            dataIndex: "gstNo",
            align: "center"
        },
        {
            title: "PAN No.",
            dataIndex: "panNo",
            align: "center"
        },
        {
            title: "Actions",
            dataIndex: "",
            align: "center",
            render: (_, record) => {
                return (
                    <div className={style.actionsCell}>
                        <Popconfirm title="Click on to confirm" onConfirm={()=>approve(record.id)}>
                            <Button type='primary'>Approve</Button>
                        </Popconfirm>
                        <Popconfirm title="Click on to confirm" onConfirm={()=>decline(record.id)}>
                            <Button danger type='primary'>Decline</Button>
                        </Popconfirm>
                        <Button type='default'>Show Details</Button>
                    </div>
                )
            }
        }
    ]
    return (
        <div className={style.container}>
            <Table
                columns={cols}
                dataSource={data}
                loading={loading}
            />
        </div>
    )
}