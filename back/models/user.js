const mongoose=require("mongoose");
const crypto=require("crypto")
const uuid=require("uuid")


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32

    },
    email:{
        type:String,
        trim:true,
        required:true,
        maxlength:32

    },
    password:{
        type:String,
        trim:true,
        required:true,
        maxlength:32

    },
    about:{
        type:String,  
        required:false

    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    history:{
        type:Array,
        default:[]
    }
},
    {timestamps:true}

);


// //virtual fileds
// userSchema.virtual("password")
// .set(function(password){
//     this._password=password
//     this.salt=uuid()
//     this.hashed_password=this.encryptPassword(password)
// })
// .get(function(){
//     return this._password

// })

// userSchema.methods={
//     encryptPassword:function(password){
//         if(password) return " ";
//         try{
//             return crypto
//             .createHmac('sha1',this.salt)
//             .updata(password)
//             .digest("hex"); 
//         }catch(err){
//             return ""
//         }
    
//     }
// }
module.exports = mongoose.model("user", userSchema);