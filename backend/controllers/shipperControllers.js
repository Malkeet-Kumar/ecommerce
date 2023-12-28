const {
    getOnboardingPackages,
    receivedPackage,
    getRecieved,
    getDeliveryPersons,
    getOtherDispatchers,
    dispatchToNext,
    assignDelivery
} = require("../utils/queries");

async function loginShipper(req,res){

}

async function getOnboarding(req, res) {
    try {
        const packages = await getOnboardingPackages(2)
        res.status(200).json(packages)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function packageReceived(req, res) {
    try {
        const result = await receivedPackage(req.query.oid,2)
        if (result.affectedRows > 0) {
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getRecievedPackages(req, res) {
    try {
        const receivedPackages = await getRecieved(req.query.oid, 2)
        const deliverypersons = await getDeliveryPersons(2)
        const dispatchers = await getOtherDispatchers(2)
        console.log(receivedPackages, deliverypersons, dispatchers);
        res.status(200).json({ data: receivedPackages, deliverypersons, dispatchers })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

async function dispatchNext(req, res) {
    try {
        const result = await dispatchToNext(req.query.oid, 2, req.query.did, req.query.city)
        if(result.affectedRows>0){
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {   
        res.status(500).send(error)
    }
}

async function outForDelivery(req, res) {
    try {
        const result = await assignDelivery(req.query.oid,2,req.query.did,req.query.city)
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
    loginShipper,
    getOnboarding,
    packageReceived,
    getRecievedPackages,
    dispatchNext,
    outForDelivery
}