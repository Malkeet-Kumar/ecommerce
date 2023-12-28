const bcrypt = require('bcrypt');
const { v4: uuid } = require('uuid')
const { 
    createUser, 
    getUser, 
    getUserCart, 
    updateUser, 
    updateCart, 
    deleteFromCart, 
    createOrder, 
    addAddress,
    getAdresses,
    getOrders
 } = require('../utils/queries');
const { createToken, verifyToken } = require('../utils/tokenGenerator')
const sendMail = require('../utils/email')
const jwt = require('jsonwebtoken')

function getUserIdFromToken(req){
    const token = jwt.verify(req.headers.authorization,process.env.JWTKEY)
    return token
}

async function userSignup(req, res) {
    const passHash = bcrypt.hashSync(req.body.password, 10)
    const user = {
        id: uuid(),
        fname: req.body.fname.toLowerCase(),
        lname: req.body.lname.toLowerCase(),
        email: req.body.email.toLowerCase(),
        password: passHash,
        mobile: req.body.mobile
    }
    const token = createToken(user.email, user.id)
    const mailBody = `<div style="border: 1px solid grey; padding-top: 0px;">
                            <h1
                                style="text-align: center; width: inherit; background-color: salmon; color: white; padding: 10px; margin: 0;">
                                CelestialCart</h1>
                                <br/>
                                <h3 style="text-align:center; width:inherit;">${user.fname} ${user.lname}, welcome to CelestialCart</h3>
                                <p style="text-align:center; width:inherit;">Dear customer we just received your signup request, this is an auto generated verification mail.</p>
                                <p style="text-align:center; width:inherit;"><a href="${process.env.DOMAIN_ADDRESS}/${token}">Click here</a> to verify your mail</p>
                        </div>`
    try {
        const result = await createUser(user)
        console.log(result);
        if (result.affectedRows > 0) {
            sendMail(user.email, user.fname + " " + user.lname, mailBody, "Mail verification")
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Email already exits")
    }
}

async function addUserAddress(req,res){
    const userId = getUserIdFromToken(req)
    const user={
        uid:userId.id,
        name:req.body.name,
        mobile:req.body.mobile,
        country:req.body.country,
        add_line1:req.body.add_line1,
        add_line2:req.body.add_line2,
        pincode:req.body.pincode,
        city:req.body.city,
        state:req.body.state,
        landmark:req.body.landmark
    }
    console.log(user);
    try {
        const result = addAddress(user)
        res.status(200).send(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function userVerifyEmail(req, res) {
    const token = verifyToken(req.params.token, (err, data) => {
        if (err) {
            res.status(401).send("Token Expired or Invalid Token")
            return
        }
        if (data) {
            updateUser(data.data.id)
                .then((result) => {
                    if (affectedRows > 0) {
                        res.status(200).send(
                            `<div style="border: 1px solid grey; padding-top: 0px;">
                            <h1 style="text-align: center; width: inherit; background-color: salmon; color: white; padding: 10px; margin: 0;">
                            CelestialCart</h1>
                            <br/>
                            <h3 style="text-align:center; width:inherit;">welcome to CelestialCart</h3>
                            <p style="text-align:center; width:inherit;">Dear customer thanks for verification. Email has been verified.</p>
                        </div>`
                        )
                    }
                    console.log(result);
                }).catch((err) => {
                    res.status(500).send("Internal server Error")
                    console.log(err);
                });
        }
    })
}

async function userSignin(req, res) {
    const email = req.body.email.toLowerCase()
    try {
        const user = await getUser(email)
        if (user.length <= 0) {
            res.status(404).send("User not found")
            return
        }

        const result = await bcrypt.compareSync(req.body.password, user[0].password)
        if (!result) {
            res.status(401).send("Invalid password")
            return
        }

        const addresses = await getAdresses(user[0].id)
        
        const cart = await getUserCart(user[0].id)
        let total = 0;
        await cart.forEach(element => {
            if (element.stock > 0) {
                total += element.price * element.quantity
            }
        });
        delete user[0].password
        const authToken = jwt.sign({...user[0],isUser:true, isLoggedIn:true},process.env.JWTKEY,{expiresIn:"1h"})
        const u = {
            user: {...user[0],isUser:true,isLoggedIn:true},
            cartItems: cart.length || 0,
            cartTotal: total,
            addresses:addresses || [],
            authToken
        }
        console.log(u);
        res.status(200).json(u)
    } catch (err) {
        res.status(500).send(err)
    }
}

function userSignout(req, res) {
    req.session?.destroy()
    res.status(200).end()
}

async function getCart(req, res) {
    const userId = getUserIdFromToken(req)
    try {
        const result = await getUserCart(userId.id)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function createCart(req, res) {
    const userId = getUserIdFromToken(req)
    const ob = {
        pid: req.query.item,
        uid: userId.id
    }
    try {
        const result = await updateCart(ob)
        console.log(result);
        res.status(result).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

async function editCart(req, res) {
    const userId = getUserIdFromToken(req)
    const item = req.query.item
    const op = (req.query.op == 'increment') ? true : false
    try {
        const result = await updateCart(null, { op, uid: userId.id, pid: item })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteCartItem(req, res) {
    const userId = getUserIdFromToken(req)
    const item = req.query.item
    try {
        const result = deleteFromCart({ uid: userId.id, pid: item })
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function placeOrder(req, res) {
    const newAddress = req.query.newAddress
    const userId = getUserIdFromToken(req)
    try {
        const order = {
            uid:userId.id,
            paymentMethod:req.body.paymentMethod,
            paymentStatus:false, 
        }
        if(newAddress){
            const result = await addAddress({...req.body.add,uid:userId.id})
            order.add_id = result
            console.log(result);
        } else{
            order.add_id = req.body.add_id
        }
        const result = await createOrder(order)
        console.log(result.affectedRows>0);
        if(result.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err)
    }
}

async function cancelOrder(req, res) {

}

async function getUserOrders(req, res) {
    const userId = getUserIdFromToken(req)
    try {
        const orders = await getOrders(userId.id)
        console.log(orders);
        res.status(200).json(orders)
    } catch (error) {
        console.log(error);
        res.status(500).send(err)
    }
}

async function trackOrder(req, res) {

}

function setSession(req, user) {
    req.session.isLoggedIn = true
    req.session.role = 'user'
    req.session.userName = user.fname
    req.session.userId = user.id
    req.session.email = user.email
    return
}

module.exports = {
    userSignup,
    userVerifyEmail,
    addUserAddress,
    userSignin,
    userSignout,
    createCart,
    getCart,
    editCart,
    deleteCartItem,
    placeOrder,
    getUserOrders,
    cancelOrder,
    trackOrder
}