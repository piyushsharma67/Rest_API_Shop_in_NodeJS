const jwt=require('jsonwebtoken');

module.exports=(req,res,next)=>{
    try{
        auth=req.headers.authorization.split(" ")[1];
        console.log(auth);
        const decoded=jwt.verify(auth,process.env.PRIVATE_KEY)
        req.userData=decoded;
        next();
    }
    catch (error){
        return res.status(401).json({
            "message":"Auth failed"
        });
    }
}
