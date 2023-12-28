const {getOnboarding, packageReceived, getRecievedPackages, dispatchNext, outForDelivery} = require("../controllers/shipperControllers")
const shipperRoutes = require('express')()

shipperRoutes.route("/onboard")
.get(getOnboarding)
.post(packageReceived)

shipperRoutes.route("/dispatched")
.get(getRecievedPackages)
.post(dispatchNext)
.patch(outForDelivery)


module.exports = shipperRoutes