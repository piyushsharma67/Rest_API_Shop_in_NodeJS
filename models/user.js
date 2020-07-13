const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    email:{
        type:String,
        required:[true,'email required']
    },
    password:{
        type:String,
        required:[true,'password required']
    }
});

module.exports=mongoose.model('User',userSchema);