const { getDeliveries, markDelivered } = require('../controllers/deliveryControllers')

const deliverRoutes = require('express')()

deliverRoutes.route("/deliveries")
.get(getDeliveries)
.post(markDelivered)

module.exports = deliverRoutes