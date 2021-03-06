
const User=require("../models/user")
const jwt=require("jsonwebtoken");
const jwtsecret="mynameisakashneosoft"
const expressJwt=require('express-jwt')




exports.signup=(req,res)=>{
    console.log("req.body",req.body);
    const user=new User(req.body)
    user.save((err,user)=>{
        if(err){
            return res.status(400).json({
                err
            });

        }
        res.json({
            user
        })
    })
}   

exports.signin=(req,res)=>{
    const {email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(err||!user){
            return res.status(400).json({
                err:"user with that email dose not exist"
            })
        }
        if(user){
            if(password===user.password){
           
             const token=jwt.sign({_id:user._id},jwtsecret)
             res.cookie("t",token,{expire:new Date()+9999});
             const{_id,name,email,role}=user;
             return res.json({token,user:{_id,email,name,role}});
            }
 
        }
        })

        }

        exports.signout=(req,res)=>{
            res.clearCookie("t");
            res.json({message:"signout success"})
        };


        exports.requireSignin=  expressJwt({
            secret: jwtsecret,
            userProperty:"auth",
            algorithms: ['sha1', 'RS256', 'HS256','auth'],
          })


          exports.isAuth=(req,res,next)=>{
              let user=req.profile && req.auth && req.profile._id==req.auth._id
              if(!user){
                  return res.status(400).json({
                      error:"access dened"
                  })
              }
              next()
          }

          exports.isAdmin=(req,res,next)=>{
              if(req.profile.role===0){
                  return res.status(400).json({
                      error:"admin access dened"
                  })
              }
              next()
          }