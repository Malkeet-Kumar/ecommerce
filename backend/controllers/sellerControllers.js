const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")
const { csvPreProcessor } = require('../utils/helpers')
const { createOrUpdateSeller, saveSellerDocs, getSeller, getAllProductsForSeller, createProduct, addProductImage, deactivateProduct, updateProduct, getAllOrdersForSeller, acceptOrderOrDispatch, getWareHouseList, generateReport } = require('../utils/queries');

async function sellerLogin(req, res) {
    try {
        const seller = await getSeller(req.body.email)
        if (seller.length <= 0) {
            res.status(404).end()
            return
        }
        const result = await bcrypt.compareSync(req.body.password, seller[0].password)
        if (!result) {
            res.status(401).send("Invalid password")
            return
        } else {
            try {
                const authToken = jwt.sign({seller:{...seller[0],isSeller:true,isLoggedIn:true}},process.env.JWTKEY)
                res.status(200).json({
                    name: seller[0].fname + " " + seller[0].lname,
                    authToken
                })
            } catch (error) {
                console.log(error);
            }
            // setSession(req, seller[0])
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

function getSidFromToken(req){
    const decode = jwt.verify(req.headers.authorization,process.env.JWTKEY)
    return decode.seller
}

function sellerLogout(req, res) {
    req.session.destroy();
    res.status(200).end()
}

async function sellerSignUp(req, res) {
    const passHash = bcrypt.hashSync(req.body.password, 10)
    const seller = {
        email: req.body.email,
        password: passHash,
        fname: req.body.fname,
        lname: req.body.lname,
        buisness: req.body.buisness,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        pincode: req.body.pincode,
    }

    try {
        const sid = await createOrUpdateSeller(seller)

        const docs = {
            sid: sid.sid,
            gst: req.body.gst,
            pan: req.body.pan,
            account: req.body.account,
            passbook: req.files[0].filename,
            aadharFile: req.files[1].filename,
            panFile: req.files[2].filename,
            storeImage: req.files[3].filename
        }

        const res1 = await saveSellerDocs(docs)
        res.status(200).end()
    } catch (error) {
        if (error.errno == 1062) {
            res.status(304).end()
        } else {
            res.status(500).send(error)
        }
    }

}

async function getSellerProducts(req, res) {
    try {
        const seller = getSidFromToken(req)
        console.log(seller);
        const products = await getAllProductsForSeller(seller.sid)
        res.status(200).json(products)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function addProduct(req, res) {
    const seller = getSidFromToken(req)
    if (req.query.bulk) {
        try {
            const data = await csvPreProcessor(req.files[0].filename)
            const products = data.map(p => { return { ...p, sellerId: seller.sid, image: "" } })
            const result = await createProduct(null, products)
            if (result.affectedRows > 0) {
                const newData = await getAllProductsForSeller(seller.sid)
                res.status(200).json(newData)
                return
            } else {
                res.status(304).end()
                return
            }
        } catch (error) {
            res.status(500).send(error)
            return
        }
    }

    const product = {
        name: req.body.name,
        price: req.body.price,
        image: req.files[0].filename,
        description: req.body.description,
        category: req.body.category,
        stock: req.body.stock,
        sellerId: seller.sid
    }
    try {
        const result = await createProduct(product)
        console.log(result);
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
        return
    }
}

async function updateProductSeller(req, res) {
    const seller = getSidFromToken(req)
    if (req.method == 'PUT') {
        const pid = req.query.pid
        console.log(req.files);
        try {
            const result = await addProductImage({ image: req.files[0].filename, p_id: pid })
            if (result.affectedRows > 0) {
                res.status(200).json({ image: "http://127.0.0.1:8000/uploads/productImages/" + req.files[0].filename })
                return
            }
        } catch (error) {
            res.status(500).send(error)
            return
        }
    } else {
        try {
            const r = await updateProduct(null,null,req.body)
            if(r.affectedRows>0){
                res.status(200).end()
            } else {
                res.status(304).end()
            }
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

async function deleteProduct(req, res) {
    const seller = getSidFromToken(req)
    try {
        const p_id = req.query.pid
        const r = await deactivateProduct(p_id,seller.sid)
        console.log(r);
        if(r.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

async function getSellerOrders(req, res) {
    const seller = getSidFromToken(req)
    try {
        const orders = await getAllOrdersForSeller(seller.sid)
        const centers = await getWareHouseList()
        res.status(200).json({orders,centers})
    } catch (error) {
        res.status(500).send(error)
    }
}

async function acceptOrder(req, res) {
    try {
        const o_id = req.query.oid
        const result = await acceptOrderOrDispatch(o_id);
        if(result.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end
        }
    } catch (error) {
        res.status(500).send(error)
    }    
}

async function dispatchOrder(req, res) {
    const seller = getSidFromToken(req)
    try {
        const result = await acceptOrderOrDispatch(null,{  oid:req.query.oid, center_id:req.query.center_id, dispatcherId:seller.sid })
        if(result.affectedRows>0){
            res.status(200)
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getReport(req, res) {
    const seller = getSidFromToken(req)
   try {
    const result = await generateReport(seller.sid)
    res.status(200).json(result)
   } catch (error) {
        res.status(500).send(error)
   }    
}

function setSession(req, seller) {
    req.session.isLoggedIn = true
    req.session.isSeller = true
    req.session.userId = seller.sid
    req.session.name = seller.fname + " " + seller.lname
}

module.exports = {
    sellerLogin,
    sellerLogout,
    sellerSignUp,
    getSellerProducts,
    addProduct,
    updateProductSeller,
    deleteProduct,
    getSellerOrders,
    acceptOrder,
    dispatchOrder,
    getReport
}