const { getDeliveriesForDeliveryPerson, getDeliverer, productDelivered } = require("../utils/queries")
const jwt = require('jsonwebtoken')

const getId = (req)=>{
     return jwt.verify(req.headers.authorization,process.env.JWTKEY)
}

async function getDeliveries(req, res){
     const id = getId(req)
     try {
          const result = await getDeliveriesForDeliveryPerson(id.id)
          res.status(200).json(result)
     } catch (error) {
          res.status(500).send(error)
     }
}

async function markDelivered(req, res) {
     const id = getId(req)
     try {
          const d = await productDelivered(req.query.pid,id.id)
          if(d.affectedRows>0){
               res.status(200).end()
          } else {
               res.status(304).end()
          }
     } catch (error) {
          console.log(error);
          res.status(500).send(error)
     }
}

async function login(req, res) {
     try {
          console.log("object");
          const dp = await getDeliverer(req.body.email)
          if(dp.length<=0){
               res.status(401).end()
               return
          }
          if(dp[0].password==req.body.password){
               const authToken = jwt.sign({id:dp[0].delp_id, isDeliver:true },process.env.JWTKEY,{expiresIn:process.env.TOKEN_TIME})
               res.status(200).json({user:{name:dp[0].name,center:dp[0].center,centerNumber:dp[0].center_number, isDeliver:true, isLoggedIn:true},authToken})
          } else {
               res.status(401).end()
          }
     } catch (error) {
          console.log(error);
          res.status(500).send(error)
     }
}

module.exports = {
     login,
     getDeliveries,
     markDelivered
}