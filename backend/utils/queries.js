const db = require('../models/db')
const { v4: uuid } = require('uuid')

//product Queries
function getProducts(page, items) {
    return new Promise((resolve, reject) => {
        const offset = (page - 1) * items
        const query = `select * from products where isActive = true  limit ${items} offset ${offset}`
        db.query(query, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function getCount(){
    return new Promise((resolve, reject) => {
        db.query(`select count(p_id) as count from products where isActive = true`,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

function createProduct(product, bulk) {
    return new Promise(async (resolve, reject) => {
        if (product) {
            const pid = uuid()
            const query = `insert into products values('${pid}',"${product.name}",${product.price},'${product.image}',"${product.description}","${product.category}",${product.stock},'${product.sellerId}',true,false)`
            db.query(query, (err, res) => {
                if (err) {
                    reject(err)
                }
                if (res.affectedRows > 0) {
                    resolve({ ...product, p_id: pid, isActive: 1, isApproved: 0 })
                }
            })
        }
        if (bulk) {
            let bulkQuery = 'insert into products values'
            await bulk.forEach(p => {
                const values = ` ('${uuid()}',"${p.name}",${p.price},'${p.image}',"${p.description}","${p.category}",${p.stock},'${p.sellerId || null}',1, 0),`
                bulkQuery += values
            });
            bulkQuery = bulkQuery.substring(0, bulkQuery.length - 1)
            db.query(bulkQuery, (err, res) => {
                console.log(res);
                (err) ? reject(err) : resolve(res)
            })
        }
    })
}

function updateProduct(approve, status, update) {
    return new Promise((resolve, reject) => {
        if (approve) {
            const qry = `update products set isApproved = true where p_id = '${approve}'`
            db.query(qry, (err, res) => {
                (err) ? reject(err) : resolve(res)
            })
            return
        }
        if (status) {
            const qry = `update products set isActive = ${status.val} where p_id = '${status.id}'`
            db.query(qry, (err, res) => {
                (err) ? reject(err) : resolve(res)
            })
            return
        }
        const query = `update products set name='${update.name}', price=${update.price}, description = '${update.description}', category = '${update.category}', stock = ${update.stock} where p_id = '${update.p_id}'`
        db.query(query, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function addProductImage({ image, p_id }) {
    return new Promise(async (resolve, reject) => {
        const qry = `update products set image='${image}' where p_id = '${p_id}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function deactivateProduct(pid, sid) {
    return new Promise((resolve, reject) => {
        const qry = `update products set isActive = false where p_id = '${pid}' and sellerId = '${sid}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function deleteProduct(pid) {
    return new Promise((resolve, reject) => {
        const qry = `delete from products where p_id = '${pid}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

//user Queries

function createUser(user) {
    return new Promise((resolve, reject) => {
        qry = `insert into users values ('${user.id}', '${user.email}', '${user.password}', '${user.fname}', '${user.lname}', '${user.mobile}', false)`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function getUser(email) {
    return new Promise((resolve, reject) => {
        qry = `select * from users where email = '${email}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function getUserCart(id) {
    return new Promise((resolve, reject) => {
        const qry = `select carts.*, products.* ,sellers.buisness from carts join products on carts.p_id = products.p_id join sellers on products.sellerId = sellers.sid where u_id = '${id}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function updateUser(verify, edit) {
    return new Promise((resolve, reject) => {
        if (verify) {
            const qry = `update users set isMailVerified = true where id = '${verify}'`
            db.query(qry, (err, res) => {
                (err) ? reject(err) : resolve(res)
            })
        }

        if (edit) {
            //
        }
    })
}

function addAddress(user) {
    console.log(user);
    return new Promise((resolve, reject) => {
        const add_id = uuid()
        const qry = `insert into addresses values('${add_id}','${user.uid}','${user.fullname}','${user.mobile}','${user.country}','${user.add_line1}','${user.add_line2}','${user.pincode}','${user.city}','${user.state}','${user.landmark}')`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(add_id)
        })
    })
}

function getAdresses(uid) {
    return new Promise((resolve, reject) => {
        const qry = `select addresses.* from addresses join users on id=u_id where users.id = '${uid}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function updateCart(cart, updatedCart) {
    return new Promise((resolve, reject) => {
        if (cart) {
            qry1 = `select * from carts where u_id='${cart.uid}' and p_id='${cart.pid}'`
            qry2 = `insert into carts values('${cart.uid}','${cart.pid}',"1","${new Date().toISOString()}")`
            db.query(qry1, (err, res1) => {
                console.log(qry1);
                if (err) {
                    reject(err)
                }
                if (res1.length <= 0) {
                    db.query(qry2, (err2, res2) => {
                        console.log(qry2);
                        (err2) ? reject(err2) : resolve(200)
                    })
                } else {
                    resolve(304)
                }
            })
        }
        if (updatedCart) {
            const qry3 = `update carts set quantity = quantity${(updatedCart.op) ? '+' : '-'}1 where u_id='${updatedCart.uid}' and p_id='${updatedCart.pid}'`
            console.log(qry3);
            db.query(qry3, (err, data) => {
                (err) ? reject(err) : resolve(data)
            })
        }
    })
}

function deleteFromCart(cart) {
    return new Promise((resolve, reject) => {
        const qry = `delete from carts where u_id = '${cart.uid}' and '${cart.pid}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

async function createOrder(order) {
    let bulkQuery = 'insert into orders values'
    const cart = await getUserCart(order.uid)
    console.log(order);
    await cart.forEach(p => {
        if (p.stock > p.quantity) {
            const values = ` ('${uuid()}','${order.uid}','${p.p_id}','${p.sellerId}','${p.quantity}','${order.paymentMethod}',${order.paymentStatus},'${new Date().toISOString()}','${order.add_id}','${p.price * p.quantity}', 0),`
            bulkQuery += values
        }
    });
    bulkQuery = bulkQuery.substring(0, bulkQuery.length - 1)
    return new Promise((resolve, reject) => {
        db.query(bulkQuery, (err, res) => {
            if (err) {
                reject(err)
            } else {
                const qry1 = `delete from carts where u_id='${order.uid}' and p_id in ( select products.p_id from products join carts on products.p_id = carts.p_id where quantity<=stock )`
                db.query(qry1, (err1, res1) => {
                    (err1) ? reject(err1) : resolve(res1)
                })
            }
        })
    })
}

function getOrders(uid) {
    return new Promise((resolve, reject) => {
        const qry = `SELECT o_id, name, image, billAmount, buisness as sellerName, placedDate, statusCode from orders join products on orders.p_id = products.p_id join sellers on products.sellerId = sellers.sid where orders.u_id = '${uid}'`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function updateOrder(order) {

}

function orderTrackingStatus(order) {

}

//seller Queries

function createOrUpdateSeller(seller, mailVerified, approved) {
    return new Promise((resolve, reject) => {
        if (seller) {
            const sid = uuid()
            const qry = `insert into sellers values("${sid}","${seller.email}","${seller.password}","${seller.fname}","${seller.lname}","${seller.buisness}","${seller.address}","${seller.city}","${seller.pincode}","${seller.country}",false,false)`
            db.query(qry, (err, res) => {
                (err) ? reject(err) : resolve({ res: res, sid: sid })
            })
        } else if (mailVerified) {
            const qry = `update sellers set isMailVerified = true where sid="${mailVerified}"`
            db.query(qry, (err, res) => {
                (err) ? reject(err) : resolve(res)
            })
        } else {
            const qry = `update sellers set approved = true where sid="${approved}"`
            db.query(qry, (err, res) => {
                (err) ? reject(err) : resolve(res)
            })
        }

    })
}

function saveSellerDocs(docs) {
    return new Promise((resolve, reject) => {
        const qry = `insert into seller_docs values("${docs.sid}","${docs.gst}","${docs.pan}","${docs.account}","${docs.passbook}","${docs.panFile}","${docs.aadharFile}","${docs.storeImage}",null)`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function getSeller(email) {
    return new Promise((resolve, reject) => {
        const qry = `select * from sellers where email = "${email}"`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function getAllProductsForSeller(sid) {
    return new Promise((resolve, reject) => {
        const qry = `select * from products where sellerId="${sid}" and isActive=true`
        db.query(qry, (err, res) => {
            (err) ? reject(err) : resolve(res)
        })
    })
}

function getAllOrdersForSeller(sid){
    return new Promise((resolve, reject) => {
        const qry = `select o.*, p.name, p.image, a.fullname, a.mobile, a.addressline1, a.addressline2, a.landmark, a.city, a.pincode, a.state, a.country from orders o join products p on o.p_id = p.p_id join addresses a on o.address=a.add_id where sid = '${sid}'`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

function getWareHouseList(state){
    return new Promise((resolve, reject) => {
        const qry = `select center, shipper_id as cid from shippers`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })    
}

function acceptOrderOrDispatch(accept,dispatch){
    return new Promise(async(resolve, reject) => {
        if(accept){
            const qry = `insert into trackingstatus values('${accept}',1,NULL,NULL,NULL,1,'${new Date().toISOString()}',NULL);`
            const qry1 = `update orders set statusCode = 1 where o_id = '${accept}';`
            db.query(qry,(err,res)=>{
                if(err){
                    reject(err)
                } else if(res.affectedRows>0){
                    db.query(qry1,(err1,res1)=>{
                        (err)?reject(err):resolve(res1)
                    })
                }
            })
        }
        if(dispatch){
            db.query(`select city, center from shippers where shipper_id='${dispatch.center_id}'`,(err,res)=>{
                if(err){
                    reject(err)
                }
                console.log(res);
                const qry = `insert into trackingstatus values('${dispatch.oid}',2,'${res[0].city}','${dispatch.dispatcherId}','${dispatch.center_id}',false,NULL,NULL)`
                db.query(qry,(err1,res1)=>{
                    if(err1){
                        reject(err1)
                    }
                    db.query(`update orders set statusCode = 2 where o_id='${dispatch.oid}'`,(err2,res2)=>{
                        (err2)?reject(err2):resolve(res2)
                    })
                })
            })
        }
    })
}

function generateReport(sid,options){
    console.log(sid);
    return new Promise((resolve, reject) => {
        const qry1 = `SELECT COUNT(p_id) AS count, isApproved FROM products WHERE sellerId = '${sid}' AND isActive = true GROUP BY isApproved`
        const qry2 = `SELECT count(o_id) count, statusCode from orders where sid = '${sid}' GROUP BY statusCode`
        const qry3 = `select sum(billAmount) sales from orders where statusCode = 4 and sid = '${sid}'`
        const qry4 =  `SELECT sum(quantity) sold, name from orders o join products p on o.p_id = p.p_id where statusCode=4 and o.sid = '${sid}' GROUP BY o_id ORDER BY quantity desc LIMIT 5`
        db.query(qry1,(err1,res1)=>{
            if(err1){
                reject(err1)
            }
            db.query(qry2,(err2,res2)=>{
                if(err2){
                    reject(err2)
                }
                db.query(qry3,(err3,res3)=>{
                    if(err3){
                        reject(err3)
                    }
                    db.query(qry4,(err4,res4)=>{
                        (err4)?reject(err4):resolve([res1,res2,res3,res4])
                    })
                })
            })
        })
    })
}

//admin Queries



//shipper Querires

function getOnboardingPackages(sid){
    return new Promise((resolve, reject) => {
        const qry = `select o.o_id as oid, o.quantity, o.payment_method, o.payment_status, o.placedDate, a.fullname, a.mobile, a.city, a.state from orders o join addresses a on o.address=a.add_id join trackingstatus t on t.o_id = o.o_id where t.assignedTo = '${sid}' and t.isRecieved is false and sendNext is NULL`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

function receivedPackage(oid,sid){
    return new Promise((resolve, reject) => {
        const qry = `update trackingstatus set isRecieved=true, date = '${new Date().toISOString()}' where o_id = '${oid}' and assignedTo = '${sid}'`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

function getRecieved(oid,sid){
    return new Promise((resolve, reject) => {
        const  qry = `select o.o_id as oid, o.quantity, o.payment_method, o.payment_status, o.placedDate, a.fullname, a.mobile, a.city, a.state from orders o join addresses a on o.address=a.add_id join trackingstatus t on t.o_id = o.o_id where t.assignedTo = '${sid}' and t.isRecieved is true and sendNext is NULL`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

function getDeliveryPersons(sid){
    return new Promise((resolve, reject) => {
        const qry =`SELECT d.delp_id as did, d.city, d.name FROM shippers s join deliverypersons d on d.center_number=s.center_number WHERE shipper_id=${sid}`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

function getOtherDispatchers(sid){
    return new Promise((resolve, reject) => {
        const qry = `select shipper_id as sid, center, city from shippers where shipper_id != ${sid}`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

function dispatchToNext(oid,sid,nid,city){
    return new Promise((resolve, reject) => {
        const qry = `update trackingstatus set sendNext = 1 where o_id='${oid}' and assignedTo = '${sid}'`
        const qry1 = `insert into trackingstatus values('${oid}',2,'${city}','${sid}','${nid}',false,NULL,NULL)`
        db.query(qry,(err,res)=>{
            if(err){
                reject(err)
            }
            db.query(qry1,(err1,res2)=>{
                (err1)?reject(err1):resolve(res2)
            })
        })
    })
}

function assignDelivery(oid,sid,did,city){
    return new Promise((resolve, reject) => {
        const qry1 = `update orders set statusCode = 3 where o_id = '${oid}'`
        const qry2 = `update trackingstatus set sendNext = 1 where o_id='${oid}' and assignedTo = '${sid}'`
        const qry3 =  `insert into trackingstatus values('${oid}',3,'${city}','${sid}','${did}',false,'${new Date().toISOString()}',2)`
        db.query(qry1,(err1,res2)=>{
            if(err1){
                reject(err1)
            }
            db.query(qry2,(err2,res2)=>{
                if(err2){
                    reject(err2)
                }
                db.query(qry3,(err3,res3)=>{
                    (err3)?reject(err3):resolve(res3)
                })
            })
        })
    })
}

function getDeliveriesForDeliveryPerson(did){
    return new Promise((resolve, reject) => {
        const qry = `select o.o_id as oid, o.quantity, o.payment_status, o.payment_method, o.billAmount from orders o join trackingstatus t on o.o_id=t.o_id where t.assignedTo = '${did}' and t.sendNext = 2`
        db.query(qry,(err,res)=>{
            (err)?reject(err):resolve(res)
        })
    })
}

module.exports = {
    //products
    getProducts,
    createProduct,
    updateProduct,
    addProductImage,
    deactivateProduct,
    deleteProduct,
    getCount,
    //users
    createUser,
    addAddress,
    getAdresses,
    getUser,
    updateUser,
    getUserCart,
    updateCart,
    deleteFromCart,
    createOrder,
    getOrders,
    //sellers
    createOrUpdateSeller,
    saveSellerDocs,
    getSeller,
    getAllProductsForSeller,
    getAllOrdersForSeller,
    acceptOrderOrDispatch,
    getWareHouseList,
    generateReport,
    //shippers
    getOnboardingPackages,
    receivedPackage,
    getRecieved,
    dispatchToNext,
    assignDelivery,
    getDeliveryPersons,
    getOtherDispatchers,
    getDeliveriesForDeliveryPerson
}



