require('dotenv').config()
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const multer = require('multer')
const db = require('./models/db')
const app = express()
app.use(express.static('public/'))

app.use(cors({
    origin:(origin, callback) => {
        const allowedOrigins = process.env.ALLOWED_ORIGINS.split(" ");
        if (allowedOrigins.indexOf(origin) !== -1) {
          callback(null, true);
        } else {
          callback("Request from unauthorized origin");
        }
      },
    credentials: true
}))


app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

const storage = multer.diskStorage(({
    destination: (req, file, cb)=>{ 
        if(file.fieldname=="storeImage"){
            cb(null,__dirname+"/public/uploads/storeImages")
        } else if(file.fieldname=="passbook"){
            cb(null,__dirname+"/public/uploads/passbook")
        } else if(file.fieldname=="aadharFile"){
            cb(null,__dirname+"/public/uploads/aadharCard")
        } else if(file.fieldname=="panFile"){
            cb(null,__dirname+"/public/uploads/panCard")
        } else if(file.fieldname=='productCsv'){
            cb(null,__dirname+"/public/importedCsv")
        } else {
            cb(null,__dirname+"/public/uploads/productImages")
        }
    },
    filename: (req, file, cb)=>{
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
}))

const upload = multer({storage:storage});
app.use(upload.any());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    console.log("Method=> ", req.method);
    console.log("Path=> ", req.path);
    console.log("Body=> ", req.body);
    console.log("Files=> ",req.files)
    next()
})

const productRoutes = require('./routes/productRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')
const sellerRoutes = require('./routes/sellerRoutes')
const shipperRoutes = require("./routes/shipperRoutes")
const deliverRoutes = require("./routes/deliverRoutes")

app.use("/api", productRoutes)
app.use("/api/user", userRoutes)
app.use("/api/seller",sellerRoutes);
app.use("/api/shipper",shipperRoutes)
app.use("/api/deliver",deliverRoutes)
app.use("/api/admin",adminRoutes)

db.connect((err) => {
    if (err) {
        console.log(err);
        return
    }
    app.listen(process.env.PORT, async () => {
        console.log("Server Started");
    })
})


// app.get("/", (req, res) => {
//     res.writeHead(302, {
//         Location: 'http://localhost:5173/'
//     });
//     res.end();
// })

// const data = await fetch('https://dummyjson.com/products?skip=0&limit=201')
// const res = await data.json()
// res.products.forEach(async (p) => {
//     const product = {
//         name: p.title,
//         price: p.price,
//         description: p.description,
//         image: p.images[0],
//         category: p.category,
//         stock: p.stock,
//         sellerId: "387e5f8b-76a7-441f-af57-765e35ff1408"
//     }
//     const a = await addProduct(product)
//     console.log(a);
// });