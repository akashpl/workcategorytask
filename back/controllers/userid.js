const User=require('../models/user');


exports.userById=(req,res,next,id)=>{
   User.findById(id).exec((err,user)=>{


    if(err||!user){
        return res.status(400).json({
            error:"user not found"
        })
    }
    res.profile=user;
    next();

});
}

exports.read=(req,res)=>{
    req.profile.password=undefined
    req.profile.salt=undefined
    return res.json(req.profile)
}

exports.update=(req,res)=>{
   
    User.findByIdAndUpdate({_id:req.profile._id},{$set:req.body},{new:true},
    (err,user)=>{
        if(err){
            return res.status(400).json({
                error:"error"
            })

        }
        user.password=undefined;
        user.salt=undefined;
        res.json(user)
    }


    )
}