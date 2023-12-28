const loginUrl = "http://127.0.0.1:8000/api/user/login"
const logoutUrl = "http://127.0.0.1:8000/api/user/logout"
const singupUrl = "http://127.0.0.1:8000/api/user/signup"
const productUrl = "http://127.0.0.1:8000/api/products?"
const ordersUrl = "http://127.0.0.1:8000/api/user/orders"
const cartUrl = "http://127.0.0.1:8000/api/user/cart"

const sellerLogoutUrl="http://127.0.0.1:8000/api/seller/logout"
const sellerLoginUrl = "http://127.0.0.1:8000/api/seller/login"
const sellerInventory = "http://127.0.0.1:8000/api/seller/inventory"
const sellerOrders = "http://127.0.0.1:8000/api/seller/orders"
const sellerDispatchCenter = "http://127.0.0.1:8000/api/seller/centers"
const sellerReport = "http://127.0.0.1:8000/api/seller/reports"

const shipperOnboard = "http://127.0.0.1:8000/api/shipper/onboard"
const shipperOut = "http://127.0.0.1:8000/api/shipper/out"
const shipperDispatched = "http://127.0.0.1:8000/api/shipper/dispatched"
const delivery = "http://127.0.0.1:8000/api/deliver/deliveries"

export {
    loginUrl,
    logoutUrl,
    singupUrl,
    productUrl,
    ordersUrl,
    cartUrl,    
    sellerLoginUrl,
    sellerLogoutUrl,
    sellerInventory,
    sellerOrders,
    sellerDispatchCenter,
    shipperOnboard,
    shipperOut,
    shipperDispatched,
    delivery,
    sellerReport
}