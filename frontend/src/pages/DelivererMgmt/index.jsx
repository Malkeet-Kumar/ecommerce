import { Table, Button, message, Popconfirm, Space } from 'antd'
import style from './style.module.css'
import { useGetData } from '../../apis/apiCalls'
import { delivererMgmt } from '../../apis/apiUrls'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'
import { useContext, useState } from 'react'
import ShipperContext from '../../context/shipperContext'

export default function DeliverMgmt() {
    const [isUnauth, isError, err, loading, data, setData] = useGetData(delivererMgmt, localStorage.getItem("token"))
    const { user } = useContext(ShipperContext)
    const [showForm, setShowForm] = useState(false)
    const [deliverer, setDeliverer] = useState({ name: "", mobile: "", email: "", password: "" })
    const [newPass,setNewPass] = useState("")
    const openCloseForm = () => {
        setShowForm(p => !p)
    }

    const deleteDeliverer = async (did) => {
        try {
            const res = await fetch(delivererMgmt + "?did=" + did, {
                method: "DELETE",
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            if (res.ok) {
                message.success("Deliverer deleted")
                const newData = data.filter(i=>i.delp_id!=did)
                setData(newData)
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const resetPassword = async(did)=>{
        if(newPass.length<=7){
            message.warning("Password length must be 8 atleast")
        }
        try {
            const res = await fetch(delivererMgmt+"?did="+did,{
                method:"PATCH",
                headers:{
                    'content-type':'application/json',
                    authorization:localStorage.getItem("token")
                },
                body:JSON.stringify({password:newPass})
            })
            if(res.ok){
                message.success("Password updated successfully")
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const createDeliverer = async () => {
        if (deliverer.name == "" || deliverer.email == "" || deliverer.mobile == "" || deliverer.password == "") {
            message.warning("Every field is mandatory")
            return
        }
        try {
            const res = await fetch(delivererMgmt, {
                method: "POST",
                headers: {
                    'content-type': 'application/json',
                    authorization: localStorage.getItem("token")
                },
                body: JSON.stringify({ ...deliverer, city: user.city, center_number: user.centerNumber, pincode: user.pincode })
            })
            if (res.ok) {
                message.success("Deliverer account created")
                const d = res.json()
                setData([...data, d])
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const cols = [
        {
            title: "Name",
            dataIndex: "name",
            align: "center"
        },
        {
            title: "Email",
            dataIndex: "email",
            align: "center"
        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            align: "center"
        },
        {
            title: "Actions",
            dataIndex: "delp_id",
            align: "center",
            render: (val) => (
                <Space>
                    <Popconfirm
                        title={
                            <div className={style.resetPass}>
                                <label htmlFor="">New Password</label>
                                <input type="text" value={newPass} onInput={e=>setNewPass(e.target.value)}/>
                            </div>
                        }
                        onConfirm={()=>resetPassword(val)}
                    >
                        <Button type='primary'>Reset Password</Button>
                    </Popconfirm>
                    <Popconfirm title="Are you sure ?" onConfirm={() => deleteDeliverer(val)}>
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
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
            <button className={style.openCloseBtn} onClick={() => openCloseForm()}>{(showForm) ? <BiSolidRightArrow /> : <BiSolidLeftArrow />}</button>
            {(showForm) ? <div className={style.form}>
                <h2>Create Deliverer</h2>
                <div className={style.upper}>
                    <label htmlFor="">Name</label>
                    <input type="text" value={deliverer.name} onInput={e => setDeliverer({ ...deliverer, name: e.target.value })} placeholder='Name of Deliverer' />
                    <label htmlFor="">Mobile</label>
                    <input type="text" value={deliverer.mobile} onInput={e => setDeliverer({ ...deliverer, mobile: e.target.value })} placeholder='Mobile no.' />
                    <label htmlFor="">email</label>
                    <input type="text" value={deliverer.email} onInput={e => setDeliverer({ ...deliverer, email: e.target.value })} placeholder='Username' />
                    <label htmlFor="">Password</label>
                    <input type="text" value={deliverer.password} onInput={e => setDeliverer({ ...deliverer, password: e.target.value })} placeholder='Password' />
                </div>
                <div className={style.btns}>
                    <Button type='primary' onClick={createDeliverer}>Create Account</Button>
                    <Button danger type='primary' onClick={() => setDeliverer({ name: "", mobile: "", email: "", password: "" })}>Reset Form</Button>
                </div>
            </div> : null}
        </div>
    )
}