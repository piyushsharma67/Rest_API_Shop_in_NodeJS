const express=require('express');
const router=express.Router();
const mongoose=require("mongoose");

const auth=require('../middleware/check_auth');

const Product=require('../models/product');

router.get('/',(req,res,next)=>{
    Product.find(function(err,result){
        if(err) throw err;
        else{
            console.log(result);
            res.status(200).json({
                "query":result
            });
        }
    });
    
});

router.post('/delete_user/:name',(req,res,next)=>{
    let name1=req.params.name;
    console.log(name1);
    Product.deleteMany({"name":name1},function(err){
        if (err) throw err;
        else{
            console.log("deleted")
            res.status(200).json({
                "message":"deleted"
            });
        }
    });
});

router.get('/get_product/:name',(req,res,next)=>{
    name=req.params.name;
    Product.findOne({"name":name},function(err,result){
        if(err) throw err;
        else{
            console.log(result);
            res.json({"product":result});
        }
    });
});

router.post('/update_product/:name',(req,res,next)=>{
    name=req.params.name;
    Product.findOne({"name":name},function(err,result){
        if(err) throw err;
        else{
            result.price=10;
            console.log("updation successful");
            res.json({"product":result});
        }
    });

});

router.post('/insert_product',auth,(req,res,next)=>{
    const product=new Product({
        _id:new mongoose.Types.ObjectId(),
        name:req.body.name,
        price:req.body.price

    });
    product.save(function(err,result){
        if (err) throw err;
        else{
            console.log(result);
        }
    })
    res.status(200).json(

        {
            "message":"POSTED in database"
        }
    );

});

module.exports=router;



