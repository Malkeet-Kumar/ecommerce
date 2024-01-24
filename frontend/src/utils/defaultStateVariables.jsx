const defaultUser = {
    user:{
        isUser:true,
        isLoggedIn:false,
        fname: 'Guest',
    },
    cartItems: 0,
    cartTotal:0,
    addresses:[]
}

const defaultCart = {
    cartArray: [],
    cartTotal: 0,
    deliveryCharges: 0
}

const defaultSeller = {
    isSeller: true,
    name: "GuestSeller",
    isLoggedIn: false
}

const defaultShipper = { 
        name: "", 
        isLoggedIn: false, 
        isShipper: true, 
        isDeliver: true 
    }

const defaultAdmin = {
    isAdmin:true,
    isLoggedIn:false,
    name:"Admin"
}


export {
    defaultUser,
    defaultCart,
    defaultSeller,
    defaultShipper,
    defaultAdmin
}