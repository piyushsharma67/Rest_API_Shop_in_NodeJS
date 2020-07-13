const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

router.post('/sign_up',(req,res,next)=>{
    const email=req.body.email;
    console.log(email);
    User.findOne({email:email},(err,result)=>{
        console.log(result);
        console.log(err);
        if (result==null){
            bcrypt.hash(req.body.password,10,(err,result)=>{

                if (err) throw err;
                else{
                    const user=new User({
                        _id:new mongoose.Types.ObjectId(),
                        email:email,
                        password:result
        
                    });
                    user.save((err,result)=>{
                        if (err) throw err;
                        else{
                            res.status(200).json({
                                "message":"user saved in database"
                            });
                        }
                    });
                }
            });

        }
        else{
            res.json({
                "message":"user already exists"
            });
        }
    });
});

router.get('/login',(req,res,next)=>{
    let emailId=req.body.email;
    let password=req.body.password;
    console.log(emailId);
    User.findOne({"email":emailId},(err,result)=>{
        console.log(err);
        console.log(result);
        if(err!=null)
        {
            res.json({
                "message":"Authentication failed1"
            });
        }else{
            bcrypt.compare(password,result.password,(err,out)=>{
                
                console.log(out);
                if(err==true){
                    res.json({
                        "message":"Authentication failed2"
                    });
                }else
                {
                    if (out){
                        const Token=jwt.sign({
                            email:result.email,
                            userId:result._id
                        },
                        process.env.PRIVATE_KEY,
                        {
                            expiresIn:"1h"
                        })
                        res.json({
                            "message":"Authentication successful",
                            "token":Token
                        });
                    }
                    else
                    {
                        res.json({
                            "message":"Authentication failed3"
                        });

                    }
                }

            });

        }
    });

});
   


router.get('/all_users',(req,res,next)=>{
    User.find((err,result)=>{
        if (err) throw err;
        else{
            res.json({
                "users":result
            });
        }
    });
});



module.exports=router;
    
    