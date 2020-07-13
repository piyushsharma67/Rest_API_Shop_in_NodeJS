const express=require('express');
const app=express();
const bodyParser=require('body-parser');
// const urlEncodedParser=require("urlencoded-parser");


const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://piyush_db_shop:'+ process.env.MONGO_ATLAS_PW +'@shop-dzbsj.mongodb.net/test?retryWrites=true&w=majority', 
{
    useNewUrlParser: true,
    useUnifiedTopology: true 
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const productInfo=require('./routes/product');
const userInfo=require('./routes/user');

app.use('/product',productInfo);
app.use('/user',userInfo);

module.exports=app;