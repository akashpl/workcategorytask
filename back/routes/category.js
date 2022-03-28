const express=require("express")
const router =express.Router();

const {create,categoryById,read,update,remove,list}=require("../controllers/category")

const {userById}=require("../controllers/userid")

const {requireSignin,isAdmin,isAuth}=require("../controllers/auth")
router.param("userId",userById)

router.get('/category/:categoryId',read)
router.post("/category/create/:userId",create);
router.delete('/category/:categoryId/:userId',remove)
router.param("categoryId", categoryById)
//router.put("/categ",updata)
router.put('/category/:categoryId/:userId',update)
router.get("/categories",list);







module.exports=router;