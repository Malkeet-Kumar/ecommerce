const { getDeliveriesForDeliveryPerson } = require("../utils/queries")

async function getDeliveries(req,res){
   try {
        const result = await getDeliveriesForDeliveryPerson(2)
        res.status(200).json(result)
   } catch (error) {
        res.status(500).send(error)
   }
}

function markDelivered(req,res){

}

module.exports = {
    getDeliveries,
    markDelivered
}