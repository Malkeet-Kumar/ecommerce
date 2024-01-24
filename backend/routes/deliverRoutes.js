const { getDeliveries, markDelivered, login } = require('../controllers/deliveryControllers')

const deliverRoutes = require('express')()
const jwt = require('jsonwebtoken')

const deliverypersonsAuth = (req,res,next)=>{
    try {
        if(req.headers.authorization){
            console.log(jwt.decode(req.headers.authorization));
            const u = jwt.verify(req.headers.authorization,process.env.JWTKEY)
            if(u.isDeliver){
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

deliverRoutes.post("/login",login)

deliverRoutes.use("/deliveries",deliverypersonsAuth)
deliverRoutes.route("/deliveries")
.get(getDeliveries)
.post(markDelivered)

module.exports = deliverRoutes