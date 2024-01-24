const {
    getOnboardingPackages,
    receivedPackage,
    getRecieved,
    getDeliveryPersons,
    getOtherDispatchers,
    dispatchToNext,
    assignDelivery,
    getShipper,
    getDeliverer,
    makeDeliverer,
    deleteDeliveryPerson,
    upadateDeliverer
} = require("../utils/queries");
const jwt = require('jsonwebtoken')

const getShipperId = async (req) => {
    return jwt.verify(req.headers.authorization, process.env.JWTKEY)
}

async function loginShipper(req, res) {
    try {
        const shipper = await getShipper(req.body.email)
        if (shipper.length <= 0) {
            res.status(401).end()
            return
        }
        if (shipper[0].password == req.body.password) {
            const authToken = jwt.sign({ sid: shipper[0].shipper_id, isShipper: true }, process.env.JWTKEY)
            res.status(200).json({ user: { name: shipper[0].name, city: shipper[0].city, pincode: shipper[0].pincode, center: shipper[0].center, centerNumber: shipper[0].center_number, isShipper: true, isLoggedIn: true }, authToken })
        } else {
            res.status(401).end()
        }
    } catch (error) {
        console.log(error, "klljjkjl");
        res.status(500).send(error)
    }
}

async function getOnboarding(req, res) {
    const sid = await getShipperId(req)
    try {
        const packages = await getOnboardingPackages(sid.sid)
        res.status(200).json(packages)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function packageReceived(req, res) {
    const sid = await getShipperId(req)
    try {
        const result = await receivedPackage(req.query.oid, sid.sid)
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
    const sid = await getShipperId(req)
    try {
        const receivedPackages = await getRecieved(req.query.oid, sid.sid)
        const deliverypersons = await getDeliveryPersons(sid.sid)
        const dispatchers = await getOtherDispatchers(sid.sid)
        res.status(200).json({ data: receivedPackages, deliverypersons, dispatchers })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
}

async function dispatchNext(req, res) {
    const sid = await getShipperId(req)
    try {
        const result = await dispatchToNext(req.query.oid, sid.sid, req.query.did, req.query.city)
        if (result.affectedRows > 0) {
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function outForDelivery(req, res) {
    const sid = await getShipperId(req)
    try {
        const result = await assignDelivery(req.query.oid, sid.sid, req.query.did, req.query.city)
        if (result.affectedRows > 0) {
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function getDeliverers(req, res) {
    const sid = await getShipperId(req)
    try {
        const result = await getDeliveryPersons(null, sid.sid)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
}

async function createDeliverer(req, res) {
    try {
        const result = await makeDeliverer(req.body)
        res.status(200).end()
    } catch (error) {
        res.status(500).send(error)
    }
}

async function deleteDeliverer(req, res) {
    try {
        const result = await deleteDeliveryPerson(req.query.did)
        if (result.affectedRows > 0) {
            res.status(200).end()
        } else {
            res.status(304).end()
        }
    } catch (error) {
        res.status(500).send(error)
    }
}

async function updateDelivererPassword(req, res) {
    try {
        const result = await upadateDeliverer({ did: req.query.did, password: req.body.password })
        if (result.affectedRows > 0) {
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
    outForDelivery,
    getDeliverers,
    createDeliverer,
    updateDelivererPassword,
    deleteDeliverer
}