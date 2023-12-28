import ProductContainer from '../../containers/productContainer'
import { useEffect, useState } from 'react'
import Product from '../../components/userComponents/product'
import { SHOP_TITLE } from '../../utils/titles'
import Loading from '../../containers/loading'
import Error from '../../containers/error'
import { productUrl } from '../../apis/apiUrls'
import {  useGetDataWithCount } from '../../apis/apiCalls'
import Alert from '../../components/sweetAlert'
import style from './style.module.css'
import { LuHeading1 } from 'react-icons/lu'

export default function Products() {
    const [currentPage,setCurrPage] = useState(1)
    const [currentItems,setCurrItems] = useState(10)
    const token = localStorage.getItem("token")
    const [isUnauth,isError, err, isLoading, count, data, setData] = useGetDataWithCount(productUrl,currentItems,currentPage)
    useEffect(() => {
        document.title = SHOP_TITLE
    })

    const Child = () => {
        if (isError) {
            return <Error err={err} heading="Oops Somthing went wrong." />
        } else if (isLoading) {
            return <Loading />
        } else {
            if(data.length<=0) return <h1>No Products to show</h1>
            return data.map(product => <Product product={product} />)
        }
    }

    const setPage = (page,size)=>{
        setCurrItems(size)
        setCurrPage(page)
    }

    return (
        <ProductContainer currentPage={currentPage} total={count} setCurrPage={setPage}>
            <Child />
        </ProductContainer>
    )
}