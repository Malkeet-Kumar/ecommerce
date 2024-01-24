import { useGetData } from '../../apis/apiCalls'
import { adminProductReq } from '../../apis/apiUrls'
import style from './style.module.css'
import { Table, Popconfirm, Button, message } from 'antd'
import ImageCell from '../../components/imageCell'

export default function ApproveProducts() {
    const [isUnauth, isError, err, loading, data, setData] = useGetData(adminProductReq, localStorage.getItem("token"))

    const approve= async(pid)=>{
        try {
            const res = await fetch(adminProductReq+"?pid="+pid,{
                method:"POST",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                message.success("Product request approved")
                const newData = data.filter(i=>i.p_id!=pid)
                setData(newData)
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const reject = async(pid)=>{
        try {
            const res = await fetch(adminProductReq+"?pid="+pid,{
                method:"DELETE",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                message.success("Product request declined")
                const newData = data.filter(i=>i.p_id!=pid)
                setData(newData)
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const cols = [
        {
            title: "Image",
            dataIndex: "image",
            render: (url,r) => <ImageCell src={url} alt={r.name}/>
        },
        {
            title: "Product Title",
            dataIndex: "name",
            align: "center"
        },
        {
            title: "Category",
            dataIndex: "category",
            align: "center"
        },
        {
            title: "Price",
            dataIndex: "price",
            align: "center"
        },
        {
            title: "Description",
            dataIndex: "description",
            align: "center"
        },
        {
            title: "Seller",
            dataIndex: "sellerName",
            align: "center"
        },
        {
            title: "Actions",
            align: "center",
            render: (_,r) => (
                <div className={style.actionsCell}>
                    <Popconfirm title="Click ok to confirm" onConfirm={()=>approve(r.p_id)}>
                        <Button type='primary'>Approve</Button>
                    </Popconfirm>
                    <Popconfirm title="Click ok to confirm" onConfirm={()=>reject(r.p_id)}>
                        <Button danger type='primary'>Reject</Button>
                    </Popconfirm>
                </div>
            )
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