import { Table, Popconfirm, Button, message } from 'antd'
import { useGetData } from '../../apis/apiCalls'
import { adminAllProducts } from '../../apis/apiUrls'
import style from './style.module.css'
import ImageCell from '../../components/imageCell'

export default function AllProducts() {
    const [isUnauth, isError, err, loading, data, setData] = useGetData(adminAllProducts, localStorage.getItem("token"))

    const deleteProd= async(pid)=>{
        try {
            const res = await fetch(adminAllProducts+"?pid="+pid,{
                method:"delete",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                message.success("Product deleted")
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
            render: (url, r) => <ImageCell src={url} alt={r.name} />
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
            title:"Price",
            dataIndex:"price",
            align:"center"
        },
        {
            title: "Description",
            dataIndex: "description"
        },
        {
            title:"Seller",
            dataIndex:"sellerName",
            align:"center"
        },
        {
            title: "Actions",
            dataIndex: "p_id",
            align:"center",
            render: (val) => (
                <>
                    <Popconfirm title="Click ok to confirm" onConfirm={()=>deleteProd(val)}>
                        <Button danger type='primary'>Delete</Button>
                    </Popconfirm>
                </>
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