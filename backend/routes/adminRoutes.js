const adminRoutes = require("express")()
const jwt = require("jsonwebtoken")
const { 
    loginAdmin,
    getSellerReq,
    approveSeller,
    getShipperList, 
    createShipper, 
    getProductReq, 
    approveProducts, 
    getAllProducts, 
    deleteProduct,
    deleteSeller,
    rejectProduct,
    updatePassword,
    deleteShipperAccount
} = require("../controllers/adminControllers")

const auth = (req,res,next)=>{
    try {
        if(req.headers.authorization){
            const decode = jwt.verify(req.headers.authorization,process.env.JWTKEY)
            console.log(decode);
            if(decode.isAdmin){
                next()
            } else {
                res.status(401).end()
            }
        } else {
            res.status(401).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

adminRoutes.post("/login",loginAdmin)

adminRoutes.use("/sellers",auth)
adminRoutes.route("/sellers")
.get(getSellerReq)
.post(approveSeller)
.delete(deleteSeller)

adminRoutes.use("/shippers",auth)
adminRoutes.route("/shippers")
.get(getShipperList)
.post(createShipper)
.patch(updatePassword)
.delete(deleteShipperAccount)

adminRoutes.use("/products",auth)
adminRoutes.route("/products")
.get(getProductReq)
.post(approveProducts)
.delete(rejectProduct)

adminRoutes.use("/allproducts",auth)
adminRoutes.route("/allproducts")
.get(getAllProducts)
.post(deleteProduct)
.delete(deleteProduct)

module.exports = adminRoutes