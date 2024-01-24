const express = require('express')
const {
    userSignup,
    userSignin,
    userSignout,
    userVerifyEmail,
    createCart,
    editCart,
    deleteCartItem,
    getCart,
    getUserOrders,
    placeOrder,
    trackOrder,
    addUserAddress,
    cancelUserOrder
} = require('../controllers/userControllers')
const userRoutes = express()
const jwt = require("jsonwebtoken")

const auth = async(req,res,next)=>{
    if(req.headers.authorization){
        try {
            const token = await jwt.verify(req.headers.authorization,process.env.JWTKEY)
            console.log(token);
            if(token?.isUser)
                next()
        } catch (error) {
            res.status(401).send(error)
        }
    } else {
        res.status(401).end()
    }
}

userRoutes.post("/signup", userSignup)


userRoutes.use("/address",auth)
userRoutes.route("/address")
.get(addUserAddress)

userRoutes.get("/verify/:token", userVerifyEmail)

userRoutes.post("/login", userSignin)

userRoutes.get("/logout", userSignout)

userRoutes.use("/orders",auth)
userRoutes.route('/orders')
.get(getUserOrders)
.post(placeOrder)
.delete(cancelUserOrder)

userRoutes.use('/cart',auth)
userRoutes.route('/cart')
.get(getCart)
.post(createCart)
.patch(editCart)
.delete(deleteCartItem)

userRoutes.get("/logout",userSignout)

userRoutes.get("/track",trackOrder)

module.exports = userRoutes