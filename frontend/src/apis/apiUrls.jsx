const BACKEND_URL='http://127.0.0.1:8000'
const loginUrl = `${BACKEND_URL}/api/user/login`
const logoutUrl = `${BACKEND_URL}/api/user/logout`
const singupUrl = `${BACKEND_URL}/api/user/signup`
const productUrl = `${BACKEND_URL}/api/products?`
const ordersUrl = `${BACKEND_URL}/api/user/orders`
const cartUrl = `${BACKEND_URL}/api/user/cart`
const trackingUrl = `${BACKEND_URL}/api/user/track`

const sellerLogoutUrl=`${BACKEND_URL}/api/seller/logout`
const sellerLoginUrl = `${BACKEND_URL}/api/seller/login`
const sellerInventory = `${BACKEND_URL}/api/seller/inventory`
const sellerOrders = `${BACKEND_URL}/api/seller/orders`
const sellerDispatchCenter = `${BACKEND_URL}/api/seller/centers`
const sellerReport = `${BACKEND_URL}/api/seller/reports`

const shipperOnboard = `${BACKEND_URL}/api/shipper/onboard`
const shipperOut = `${BACKEND_URL}/api/shipper/out`
const shipperDispatched = `${BACKEND_URL}/api/shipper/dispatched`
const shipperLogin = `${BACKEND_URL}/api/shipper/login`
const delivererMgmt = `${BACKEND_URL}/api/shipper/deliverers`
const delivery = `${BACKEND_URL}/api/deliver/deliveries`
const deliveryLogin = `${BACKEND_URL}/api/deliver/login`

const adminLogin = `${BACKEND_URL}/api/admin/login`
const adminSellerReq = `${BACKEND_URL}/api/admin/sellers`
const adminProductReq = `${BACKEND_URL}/api/admin/products`
const adminAllProducts = `${BACKEND_URL}/api/admin/allproducts`
const adminShipper = `${BACKEND_URL}/api/admin/shippers`

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