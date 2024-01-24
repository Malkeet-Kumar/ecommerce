const { getAdmin, getLiveProducts, getUnapprovedProds, getUnapprovedSellers, getAllShippers, createNewShipper, updateProduct, createOrUpdateSeller, deleteProductReq, getProductSeller, updateShipper, deleteShipper } = require("../utils/queries")
const jwt = require('jsonwebtoken')
const sendMail = require('../utils/email')

async function loginAdmin(req, res) {
    try {
        const admin = await getAdmin(req.body.email)
        if (admin.length <= 0) {
            res.status(404).end()
            return
        }
        if (admin[0].password == req.body.password) {
            const authToken = jwt.sign({ id: admin[0].id, isAdmin: true, isLoggedIn: true },process.env.JWTKEY,{expiresIn:process.env.TOKEN_TIME})
            res.status(200).json({ user: { name: admin[0].name, isAdmin: true, isLoggedIn: true }, authToken })
        } else {
            res.status(401).end()
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await getLiveProducts()
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteProduct(req, res) {
    try {
        const result = await updateProduct(null, { status: false, pid: req.query.pid })
        if (result.affectedRows > 0) {
            res.status(200).end()
            return
        }
        res.status(304).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

async function approveProducts(req, res) {
    try {
        const result = await updateProduct({status:true,pid:req.query.pid})
        if (result.affectedRows > 0) {
            res.status(200).end()
            return
        }
        res.status(304).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getProductReq(req, res) {
    try {
        const reqs = await getUnapprovedProds()
        res.status(200).json(reqs)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getSellerReq(req, res) {
    try {
        const sellers = await getUnapprovedSellers()
        res.status(200).json(sellers)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function approveSeller(req, res) {
    try {
        const result = await createOrUpdateSeller(null, null,{ status:true,sid:req.query.sid})
        if (result.affectedRows > 0) {
            res.status(200).end()
            return
        }
        res.status(304).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteSeller(req, res) {
    try {
        const result = await createOrUpdateSeller(null, null,{ status:false,sid:req.query.sid})
        if (result.affectedRows > 0) {
            res.status(200).end()
            return
        }
        res.status(304).end()
    } catch (error) {
        res.status(500).send(500)
    }
}

async function getShipperList(req, res) {
    try {
        const shippers = await getAllShippers()
        res.status(200).json(shippers)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function createShipper(req, res) {
    try {
        const result = await createNewShipper(req.body)
        if (result.affectedRows > 0) {
            res.status(200).end()
            return
        }
        res.status(304).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

async function updatePassword(req,res){
    try {
        const result = await updateShipper(req.query.sid,req.body.password)
        if(result.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteShipperAccount(req,res){
    try {
        const result = await deleteShipper(req.query.sid)
        if(res.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).end()
    }
}

async function rejectProduct(req,res){
    try {
        const result = await updateProduct({status:false, pid:req.query.pid})
        if(result.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    loginAdmin,
    approveProducts,
    approveSeller,
    getAllProducts,
    getSellerReq,
    getProductReq,
    deleteProduct,
    createShipper,
    getShipperList,
    deleteSeller,
    rejectProduct,
    updatePassword,
    deleteShipperAccount
}