import { useState, useEffect } from "react"
import { Table, Popconfirm, Button, Space, Form, Input, Upload, message } from 'antd'
import { DownloadOutlined, UploadOutlined, PlusOutlined, LoadingOutlined } from '@ant-design/icons'
const { Search } = Input;
import { useGetData } from '../../../apis/apiCalls'
import { productUrl, sellerInventory } from "../../../apis/apiUrls"
import style from './style.module.css'
import { useForm } from "antd/es/form/Form"
import { CSVLink } from 'react-csv'
import ImageCell from "../../imageCell";

export default function MyDataTable({isUnauth,isError, err, isLoading, data, setData}) {
    const [formatdata, setFormatData] = useState([["Name", "Category", "Price", "Description", "Stock"]])
    const [editRowId, setEditRowId] = useState("")
    const [searchData, setSearchData] = useState([])
    const [searchText, setSearchText] = useState("")

    const [form] = useForm()

    const isEditing = (record) => {
        return record.p_id == editRowId
    }

    const deleteProduct = async (p_id,del) => {
        const res =  await fetch(sellerInventory+"?pid="+p_id+"&delete="+del,{method:"DELETE",headers:{
            authorization:localStorage.getItem("token")
        }})
        if(res.ok){
            message.success("Product deleted successfully !")
        } else {
            message.warning("Something went wrong !")
            return
        }
        if (searchData.length > 0) {
            const filtered = searchData.filter(i => i.p_id != p_id)
            setSearchData(filtered)
        }
        const t = data.filter(i => i.p_id != p_id)
        setData(t)
    }

    const cancelEditing = () => {
        setEditRowId("")
    }

    const saveChanges = async (p_id) => {
        try {
            const itemIndex = data.findIndex(index => index.p_id == p_id)
            const row = await form.validateFields()
            const res = await fetch(sellerInventory,{
                method:"PATCH",
                headers:{
                    authorization:localStorage.getItem("token"),
                    'content-type':'application/json'
                },
                body:JSON.stringify({...row,p_id})
            })
            if(res.ok){
                let arr = [...data]
                const { image, isApproved } = arr[itemIndex]
                arr[itemIndex] = { image, isApproved, ...row }
                setData(arr)
                setEditRowId("")
                message.success("Details updated successfully")
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const UploadImage = ({ pid }) => {
        const [loading, setLoading] = useState(false)
        // const [image, setImage] = useState(null)
        const selectImage = async (e) => {
            const image = e.target.files[0]
            if (!image) {
                message.error("Image is not selected")
                return
            }
            try {
                setLoading(true)
                const formData = new FormData()
                formData.append("pimage", image)
                const result = await fetch(sellerInventory + "?pid=" + pid, {
                    method: "PUT",
                    headers:{
                        authorization:localStorage.getItem("token")
                    },
                    body: formData
                });
                setLoading(false)
                const index = data.findIndex(item => item.p_id == pid)
                if (index >= 0 && result.ok) {
                    message.success("Image uploaded successfully !")
                    const r = await result.json()
                    data[index].image = r.image;
                    setData([...data])
                } else {
                    message.warning(result.msg)
                    return
                }
            } catch (error) {
                setLoading(false)
                message.error(error)
            }
        };
        return (
            <>
                <input type="file" name="" id="productImageUpload" hidden onInput={e => selectImage(e)} />
                <label for="productImageUpload" title="Clcik to upload image for this product">
                    <div className={style.imageCellUpload}>
                        {loading ? <LoadingOutlined /> : <PlusOutlined />}
                        Upload
                    </div>
                </label>
            </>
        );
    }


    const columns = [
        {
            title: "Image",
            dataIndex: "image",
            render: (url, record) => (
                (url) ?
                    <ImageCell src={url} alt={record.name}/>
                    :
                    <UploadImage pid={record.p_id} />
            )
        },
        {
            title: "Name",
            dataIndex: "name",
            align: "center",
            editTable: true,
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Price",
            dataIndex: "price",
            align: "center",
            editTable: true,
            sorter: (a, b) => a.price > b.price
        },
        {
            title: "Description",
            dataIndex: "description",
            align: "center",
            editTable: true,
            sorter: (a, b) => a.description.localeCompare(b.description)
        },
        {
            title: "Category",
            dataIndex: "category",
            align: "center",
            editTable: true,
            sorter: (a, b) => a.category.localeCompare(b.category)
        },
        {
            title: "Stock",
            dataIndex: "stock",
            align: "center",
            editTable: true,
            sorter: (a, b) => a.stock > b.stock
        },
        {
            title: "Approved Status",
            dataIndex: "isApproved",
            align: "center",
            render: (val) => (val==0) ? "Approval Pending": (val==1)?"Approved":"Rejected",
            sorter: (a, b) => a.isApproved > b.isApproved
        },
        {
            title: "Actions",
            dataIndex: "p_id",
            render: (id, record) => {
                const isEditable = isEditing(record)
                return (
                    data.length >= 1 ?
                        <Space>
                            <Popconfirm title="Sure to delete ?" onConfirm={() => { (record.isApproved==0)?deleteProduct(id,true):deleteProduct(id,false) }} disabled={isEditable}>
                                <Button danger type="primary">Delete</Button>
                            </Popconfirm>
                            {(isEditable)
                                ?
                                <Space>
                                    <Button type="primary" onClick={e => saveChanges(id)}>Save</Button>
                                    <Popconfirm title="Sure to Cancel ?" onConfirm={cancelEditing}>
                                        <Button>Cancel</Button>
                                    </Popconfirm>
                                </Space>
                                :
                                <Button type="primary" onClick={e => setEditRowId(id)}>Edit</Button>
                            }
                        </Space>
                        : null
                )
            }
        },
    ]

    const newCols = columns.map(col => {
        if (!col.editTable) {
            return col;
        }

        return {
            ...col,
            onCell: (record) => ({
                record,
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record)
            })
        }
    })

    const EditableCell = ({
        editing, dataIndex, title, record, children, ...restProps
    }) => {
        if (editing) {
            console.log(dataIndex);
        }

        const input = <Input />
        return (
            <td {...restProps}>
                {
                    (editing)
                        ?
                        <Form.Item
                            name={dataIndex}
                            initialValue={record[dataIndex]}
                            rules={
                                [{
                                    required: true,
                                    message: "Please Enter Some Data"
                                }]
                            }
                        >
                            {input}
                        </Form.Item>
                        :
                        children
                }
            </td>
        )
    }

    const onSearch = (val) => {
        if (val == "") {
            setSearchData([])
        }
        setSearchText(val)
        console.log(val);
        const arr = data.filter(item => {
            if (
                item.name.toLowerCase().includes(val.toLowerCase()) ||
                item.description.toLowerCase().includes(val.toLowerCase()) ||
                item.category.toLowerCase().includes(val.toLowerCase()) ||
                item.stock == val ||
                item.price == val
            ) {
                return item
            }
        })
        console.log(arr);
        setSearchData(arr)
    }

    const [uploading, setUploading] = useState(false)
    const uploadFile = async(e) => {
        console.log(e.target.files[0]);
        if(!e.target.files[0].name.includes(".csv")){
            message.warning("Invalid file type. Upload Csv file only.")
            return
        }
        const formData = new FormData()
        formData.append("productCsv",e.target.files[0])
        setUploading(true)
        try {
            const res = await fetch(sellerInventory+"?bulk=true",{
                method:"POST",
                headers:{
                    authorization:localStorage.getItem("token")
                },
                body:formData
            })
            setUploading(false)
            if(res.ok){
                const newData = await res.json()
                message.success("Product data uploaded successfully !")
                setData(newData)
            } else {
                message.warning(res)
            }
        } catch (error) {
            setUploading(false)
            message.error(error)
        }

    }

    return (
        <>
            <Space className={style.actionBar}>
                <Space>
                    <label for="csv_file">
                        <div className={style.customFileUpload} title="Click to upload a csv file containing products data">{uploading?<LoadingOutlined/>:<UploadOutlined/>} Upload Product Csv</div>
                    </label>
                    <input type="file" id="csv_file" onInput={e=>uploadFile(e)} hidden disabled={uploading}/>
                    <Button icon={<DownloadOutlined />} style={{ height: "40px", position: "absolute", left: "198px", top: "5px" }} >
                        <CSVLink data={formatdata} title="Click here to download csv file format for products data" filename="CelestialCartProductsDataFormat.csv">Download Format</CSVLink>
                    </Button>
                </Space>
                <Space>
                    <Search
                        placeholder="input search text"
                        enterButton
                        size="large"
                        style={{ width: "270px" }}
                        onChange={e => onSearch(e.target.value)}
                        allowClear
                    />
                    <Button style={{ height: "40px" }}>
                        <CSVLink filename="ListedProductsData.csv" data={data.map(i=>{return{Name:i.name,Category:i.category,Price:i.price, Description:i.description, Stock:i.stock}})} title="Click to Download this data as CSV file">Export</CSVLink>
                    </Button>
                </Space>
            </Space>
            <Space style={{marginTop:"50px"}}>
                <Form form={form} component={false}>
                    <Table
                        columns={newCols}
                        dataSource={searchData && searchData.length > 0 ? searchData : data}
                        components={
                            { body: { cell: EditableCell } }
                        }
                        bordered
                        loading={isLoading}
                    />
                </Form>
            </Space>
        </>
    )
}