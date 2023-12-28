const defaultUser = {
    fname:'Guest',
    type:'user',
    isLoggedIn:false,
    cartItems:0
}

const defaultCart = {
    cartArray:[],
    cartTotal:0,
    deliveryCharges:0
}

const defaultSeller = {
    isSeller:false,
    name:"GuestSeller",
    isLoggedIn:false
}

export {
    defaultUser,
    defaultCart,
    defaultSeller
}