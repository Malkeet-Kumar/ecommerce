import { useState } from 'react'
import style from './style.module.css'
import MyDataTable from '../../components/sellerComponents/DataTable'
import { useGetData } from '../../apis/apiCalls'
import { message } from 'antd'
import { LoadingOutlined, UploadOutlined } from '@ant-design/icons'
import { sellerInventory } from '../../apis/apiUrls'
import { useContext } from 'react'
import SellerContext from '../../context/sellerContext'

export default function InventoryContainer(props) {
    const [isUnauth, isError, err, isLoading, data, setData] = useGetData(sellerInventory, localStorage.getItem("token"))

    const [isFormVisible, setFormVisibility] = useState(false)
    const [buttonText, setButtonText] = useState("<")

    const {seller} = useContext(SellerContext)

    const setNewData = (data) => {
        setData()
        console.log("object");
    }

    const onBtnClicked = () => {
        if (buttonText == "<") {
            setButtonText(">")
        } else {
            setButtonText("<")
        }
        setFormVisibility(p => !p)
    }

    const AddItemForm = () => {
        const [uploading, setUploading] = useState(false)
        const [pname, setPname] = useState("")
        const [pcat, setPcat] = useState("")
        const [price, setPrice] = useState("")
        const [stock, setStock] = useState("")
        const [desc, setDesc] = useState("")
        const [image, setImage] = useState(null)

        const submitProduct = async () => {
            if (pname == "" || pcat == "" || price == "" || stock == "" || desc == "" || image == "") {
                message.warning("All fields are mandatory !")
                return
            }
            const formData = new FormData()
            const valArr = [pname, price, pcat, stock, desc, image]
            const keyArr = ["name", "price", "category", "stock", "description", 'image']
            valArr.forEach((val, i) => {
                formData.append(keyArr[i], val);
            })

            const resetForm = () => {
                setPname("")
                setPcat("")
                setPrice("")
                setStock("")
                setDesc("")
                setImage("")
            }

            setUploading(p => !p)
            try {
                const res = await fetch(sellerInventory, {
                    method: "POST",
                    headers: {
                        authorization: localStorage.getItem("token")
                    },
                    body: formData
                })
                if (res.ok) {
                    const product = await res.json()
                    setUploading(p => !p)
                    resetForm()
                    setData([...data, product])
                    message.success("Product added successfully !")
                }
            } catch (error) {
                message.error(error)
            }
        }

        return (
            <div className={style.rightContainer}>
                <h3>Add Product</h3>
                <div className={style.rightInputs}>
                    <div className={style.rightInnerDiv}>
                        <input type="text" id="pName" placeholder='Product Name' onInput={e => setPname(e.target.value)} />
                    </div>
                    <div className={style.rightInnerDiv}>
                        <input type="text" id="pCategory" placeholder='Category' onInput={e => setPcat(e.target.value)} />
                    </div>
                    <div className={style.rightInnerDiv}>
                        <input type="text" id="pPrice" placeholder='Price' onInput={e => setPrice(e.target.value)} />
                    </div>
                    <div className={style.rightInnerDiv}>
                        <input type="text" id="pStock" placeholder='Stock' onInput={e => setStock(e.target.value)} />
                    </div>
                    <div className={style.rightInnerDiv}>
                        <textarea id="pDesc" cols="30" rows="3" placeholder='Product Description...' onInput={e => setDesc(e.target.value)}></textarea>
                    </div>
                    <div className={style.rightInnerDiv}>
                        <label htmlFor="pImage" className={style.imageLabel}><UploadOutlined /> Choose Image</label>
                        <input type="file" id="pImage" onInput={e => setImage(e.target.files[0])} hidden />
                    </div>
                    <button onClick={submitProduct} className={style.addProduct} disabled={uploading}>{uploading ? <LoadingOutlined /> : null}  Add Product</button>
                </div>
            </div>
        )
    }


    return (
        <div className={style.container}>
            {
                seller.isLoggedIn ?
                    <>
                        <div className={style.leftContainer}>
                            <MyDataTable isUnauth={isUnauth} isError={isError} err={err} isLoading={isLoading} data={data} setData={setData} />
                        </div>
                        {(isFormVisible) ? <AddItemForm /> : <></>}
                        <div className={style.sideActionbar}>
                            <button onClick={onBtnClicked} className={style.closeBtn}>{buttonText}</button>
                        </div>
                    </> :
                    <h1>Please login first to see inventory</h1>

            }
        </div>
    )
}
