const loginUrl = "http://127.0.0.1:8000/api/user/login"
const logoutUrl = "http://127.0.0.1:8000/api/user/logout"
const singupUrl = "http://127.0.0.1:8000/api/user/signup"
const productUrl = "http://127.0.0.1:8000/api/products?"
const ordersUrl = "http://127.0.0.1:8000/api/user/orders"
const cartUrl = "http://127.0.0.1:8000/api/user/cart"
const trackingUrl = "http://127.0.0.1:8000/api/user/track"

const sellerLogoutUrl="http://127.0.0.1:8000/api/seller/logout"
const sellerLoginUrl = "http://127.0.0.1:8000/api/seller/login"
const sellerInventory = "http://127.0.0.1:8000/api/seller/inventory"
const sellerOrders = "http://127.0.0.1:8000/api/seller/orders"
const sellerDispatchCenter = "http://127.0.0.1:8000/api/seller/centers"
const sellerReport = "http://127.0.0.1:8000/api/seller/reports"

const shipperOnboard = "http://127.0.0.1:8000/api/shipper/onboard"
const shipperOut = "http://127.0.0.1:8000/api/shipper/out"
const shipperDispatched = "http://127.0.0.1:8000/api/shipper/dispatched"
const shipperLogin = "http://127.0.0.1:8000/api/shipper/login"
const delivererMgmt = "http://127.0.0.1:8000/api/shipper/deliverers"
const delivery = "http://127.0.0.1:8000/api/deliver/deliveries"
const deliveryLogin = "http://127.0.0.1:8000/api/deliver/login"

const adminLogin = "http://127.0.0.1:8000/api/admin/login"
const adminSellerReq = "http://127.0.0.1:8000/api/admin/sellers"
const adminProductReq = "http://127.0.0.1:8000/api/admin/products"
const adminAllProducts = "http://127.0.0.1:8000/api/admin/allproducts"
const adminShipper = "http://127.0.0.1:8000/api/admin/shippers"

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
    sellerReport,
    shipperLogin,
    deliveryLogin,
    trackingUrl,
    adminLogin,
    adminSellerReq,
    adminProductReq,
    adminAllProducts,
    adminShipper,
    delivererMgmt
}