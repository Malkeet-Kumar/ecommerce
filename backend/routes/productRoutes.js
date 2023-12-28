const express = require('express')
const { fetchProducts, addSingleProduct, editProduct, deleteProduct } = require('../controllers/productControllers')
const productRoutes = express()

productRoutes.route("/products")
.get(fetchProducts)
.post(addSingleProduct)
.delete(deleteProduct)
.patch(editProduct)

module.exports = productRoutes;