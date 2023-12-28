const { getProducts, addProduct, updateProduct, getCount} = require("../utils/queries")

async function fetchProducts(req,res){
    const page = req.query.page || 1
    const items = req.query.items || 8
    try {
        const products = await getProducts(page,items)
        const totalProducts = await getCount()
        res.status(200).json({products,count:totalProducts[0].count})
    } catch (error) {
        res.status(500).send(error)
    }
}

async function addSingleProduct(req,res){
    const product = req.body
    console.log(req.body);
    try {
        const result = await addProduct(product)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function editProduct(req,res){
    const product = req.body
    try {
        const result = await updateProduct(null,null,product)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteProduct(req,res){
    try {
        const result = await updateProduct(null,{id:req.query.pid,val:false})
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(err)
    }
}

module.exports = {fetchProducts, addSingleProduct, editProduct, deleteProduct}