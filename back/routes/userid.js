const express=require("express")
const router =express.Router();
const {requireSignin,isAdmin,isAuth }=require("../controllers/auth")
const{userById,update,read}=require("../controllers/userid");
router.get("/secret/:userId",requireSignin,isAuth,(req,res)=>{
    res.json({
        user:req.profile
    })
});
router.param("userId",userById)

router.get("/user/:userId",read)
router.put("/user/:userId",update)


module.exports=router;