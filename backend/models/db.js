const mysql = require('mysql2')
const mongoose = require('mongoose')

// module.exports.init = async ()=>{
//     await mongoose.connect(process.env.DB_URL)
// }
module.exports = mysql.createConnection({
    uri:process.env.MYSQL_LOCAL
})