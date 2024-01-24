import { useContext, useState } from 'react'
import { useGetData } from '../../apis/apiCalls'
import { adminShipper } from '../../apis/apiUrls'
import AdminContext from '../../context/adminContext'
import style from './style.module.css'
import { Table, Space, Button, Popconfirm, message } from 'antd'
import { BiSolidLeftArrow, BiSolidRightArrow } from 'react-icons/bi'

export default function ShipperMgmtPage(props) {
    const [isUnauth, isError, err, loading, data, setData] = useGetData(adminShipper, localStorage.getItem('token'))
    const [showForm, setShowForm] = useState(false)
    const [shipper, setShipper] = useState({ name: "", mobile: "", email: "", password: "", center: "", center_number: "", city: "", pincode: "" })
    const { user } = useContext(AdminContext)

    const resetForm = () => {
        setShipper({ name: "", mobile: "", email: "", password: "", center: "", center_number: "", city: "", pincode: "" })
    }

    const makeShipper = async () => {
        if (shipper.name == "" || shipper.mobile == "" || shipper.email == "" || shipper.password == "" || shipper.center == "" || shipper.center_number == "" || shipper.city == "" || shipper.pincode == "") {
            message.warning("All fields are mandatory")
            return
        }
        try {
            const res = await fetch(adminShipper, {
                method: "POST",
                headers: {
                    'content-type': 'application',
                    authorization:localStorage.getItem("token")
                },
                body:JSON.stringify(shipper)
            })
            if (res.ok) {
                message.success("Shipper account created")
                const d = await res.json()
                setData([...data, d])
            }
        } catch (error) {
            message.error(error)
        }
    }

    const updatePassword = async(sid,newPass)=>{
        try {
            const res = await fetch(adminShipper+"?sid="+sid,{
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

    const deletePassword = async(sid)=>{
        try {
            const res = await fetch(adminShipper+"?sid="+sid,{
                method:"DELETE",
                headers:{
                    authorization:localStorage.getItem("token")
                }
            })
            if(res.ok){
                message.success("Shipper deleted successfully")
                const newData=data.filter(i=>i.sid!=sid)
                setData(newData)
            } else {
                message.warning("Something went wrong")
            }
        } catch (error) {
            message.error(error)
        }
    }

    const ActionCell = ({val,updatePassword,deleteShipper}) => {
        const [newPass,setNewPass] = useState("")
        return (
            <Space>
                <Popconfirm
                    title={
                        <div className={style.popup}>
                            <label htmlFor="">New Password</label>
                            <input type="text" placeholder='password' value={newPass} onInput={e => setNewPass(e.target.value)} />
                        </div>
                    }
                    onConfirm={() => updatePassword(val, newPass)}
                >
                    <Button type='default'>Reset Password</Button>
                </Popconfirm>
                <Popconfirm title="Are you sure ?" onConfirm={()=>deleteShipper(val)}>
                    <Button danger>Delete</Button>
                </Popconfirm>
            </Space>
        )
    }

    const cols = [
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
            title: "Email",
            dataIndex: "email",
            align: "center"
        },
        {
            title: "Center",
            dataIndex: "center",
            align: "center"
        },
        {
            title: "Center Number",
            dataIndex: "cnum",
            align: "center"
        },
        {
            title: "City",
            dataIndex: "city",
            align: "center"
        },
        {
            title: "Pincode",
            dataIndex: "pincode",
            align: "center"
        },
        {
            title: "Actions",
            dataIndex: "sid",
            render:(val)=><ActionCell val={val} updatePassword={updatePassword} deleteShipper={deletePassword}/>
        }
    ]
return (
    <div className={style.container}>
        <Table
            columns={cols}
            dataSource={data}
            loading={loading}
        />
        <button className={style.openCloseBtn} onClick={() => setShowForm(p => !p)}>{showForm ? <BiSolidRightArrow /> : <BiSolidLeftArrow />}</button>
        {showForm ?
            <div className={style.form}>
                <h2>Create Shipper</h2>
                <div className={style.upper}>
                    <label htmlFor="">Name</label>
                    <input type="text" placeholder='Name' value={shipper.name} onInput={e => setShipper({ ...shipper, name: e.target.value })} />
                    <label htmlFor="">Mobile</label>
                    <input type="text" placeholder='Mobile' value={shipper.mobile} onInput={e => setShipper({ ...shipper, mobile: e.target.value })} />
                    <label htmlFor="">Email</label>
                    <input type="text" placeholder='Email' value={shipper.email} onInput={e => setShipper({ ...shipper, email: e.target.value })} />
                    <label htmlFor="">Password</label>
                    <input type="text" placeholder='Password' value={shipper.password} onInput={e => setShipper({ ...shipper, password: e.target.value })} />
                    <label htmlFor="">Center</label>
                    <input type="text" placeholder='Center' value={shipper.center} onInput={e => setShipper({ ...shipper, center: e.target.value })} />
                    <label htmlFor="">Center Number</label>
                    <input type="text" placeholder='Center Number' value={shipper.center_number} onInput={e => setShipper({ ...shipper, center_number: e.target.value })} />
                    <label htmlFor="">City</label>
                    <input type="text" placeholder='City' value={shipper.city} onInput={e => setShipper({ ...shipper, city: e.target.value })} />
                    <label htmlFor="">Pincode</label>
                    <input type="text" placeholder='Pincode' value={shipper.pincode} onInput={e => setShipper({ ...shipper, pincode: e.target.value })} />
                </div>
                <Space>
                    <Button type='primary' onClick={makeShipper}>Create Account</Button>
                    <Button danger onClick={resetForm}>Reset</Button>
                </Space>
            </div> :
            null
        }
    </div>
)
}