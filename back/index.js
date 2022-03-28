const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const port = 5000;
const app = express();
const path =require('path')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.set('views',path.join(__dirname,'views'))
app.use(express.static(`${__dirname}/public`))
const authroutes=require("./routes/auth")
const userroutes=require("./routes/userid")
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")

//const expressvalidator=require("express-validator")
const morgan=require("morgan");
const bodyParser=require("body-Parser")
const cookieParser=require("cookie-parser")
const db = "mongodb://localhost:27017/task";
const connectDB = async () => {
    try {
        await mongoose.connect(db, { useNewUrlParser: true });
        console.log("MongoDB connected");
    }
    catch (err) {
        console.log(err.message + "Hi");
    }
}

connectDB();
app.use(morgan('dev'))
//app.use(bodyParser.json())
app.use(cookieParser())

//app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors())



app.use(authroutes)
app.use(categoryRoutes)
app.use(userroutes)
app.use(productRoutes)

app.listen(port,(err,res)=>{
    if(err) throw err;
     console.log(`server is runing on ${port}`)
})