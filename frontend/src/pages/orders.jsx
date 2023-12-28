import OrdersContainer from "../containers/ordersContainer";
import OrderItem from "../components/userComponents/orderItem";
import { useGetData } from "../apis/apiCalls";
import { ordersUrl } from "../apis/apiUrls";
import Error from "../containers/error";
import Loading from "../containers/loading";
import { useContext } from "react";
import UserContext from "../context/userContext";
export default function Orders() {
    const [isUnauth, isError, error, isLoading, data, setData] = useGetData(ordersUrl, localStorage.getItem("token"))
    const {user} = useContext(UserContext)
    return (
            (!user.isUser)
            ?
            <h1>Please log in to see your Orders</h1>
            :
            (isError)
            ?
            <Error heading={"Error occuered"} error={error} />
            :
            (isLoading)
            ?
            <Loading />
            :
            (data.length <= 0)
            ?
            <h1>No Orders are placed yet</h1>
            :
            <OrdersContainer>
                {data.map(order => <OrderItem order={order} />)}
            </OrdersContainer>
    )
}   