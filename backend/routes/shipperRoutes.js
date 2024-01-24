const {getOnboarding, packageReceived, getRecievedPackages, dispatchNext, outForDelivery, loginShipper, getDeliverers, createDeliverer, deleteDeliverer, updateDelivererPassword} = require("../controllers/shipperControllers")
const shipperRoutes = require('express')()
const jwt = require("jsonwebtoken")

shipperRoutes.post("/login",loginShipper)

const shipperAuth = (req,res,next)=>{
    try {
        if(req.headers.authorization){
            const u = jwt.verify(req.headers.authorization,process.env.JWTKEY)
            if(u.isShipper){
                next()
            } else {
                res.status(401).end()
            }
        } else {
            res.status(401).end()
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

shipperRoutes.use("/onboard",shipperAuth)
shipperRoutes.route("/onboard")
.get(getOnboarding)
.post(packageReceived)

shipperRoutes.use("/deliverers",shipperAuth)
shipperRoutes.route("/deliverers")
.get(getDeliverers)
.post(createDeliverer)
.delete(deleteDeliverer)
.patch(updateDelivererPassword)

shipperRoutes.use("/dispatched",shipperAuth)
shipperRoutes.route("/dispatched")
.get(getRecievedPackages)
.post(dispatchNext)
.patch(outForDelivery)

module.exports = shipperRoutes