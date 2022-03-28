const formidable=require("formidable")
const _ = require("lodash");
const Product=require("../models/product");
const fs=require("fs"); 
const category = require("../models/category");





exports.create=(req,res)=>{
    let form=new formidable.IncomingForm()
    form.KeepExtensions=true
    form.parse(req ,(err,fields,files)=>{
        console.log(fields);
        console.log(files);
        if(err){
            return res.status(400).json({
                error:"Image could not be uploded"
            })
        }
         
        // const {name,description,price,category,quantity,shipping}=fields
        // if(!name || !description || !price || !category|| !quantity || !shipping){
        //     return res.status(400).json({
        //         error:"all fill are required"
        //     })
        // }


        let product =new Product(fields) ;
       
          if(files.photo){
              console.log(files.photo)
            product.photo.data= fs.readFileSync(files.photo.path)
            product.photo.contentType=files.photo.type;
        }
        product.save((err,result)=>{
            res.json(result)
        
           
            
           })
    })

}

exports.remove=(req,res)=>{
    let product=req.product
    product.remove((err,deletedproduct)=>{
        if(err){
            return res.status(400).json({
               error:"gbhnjmk,l"
            })      
    }
    res.json({
        deletedproduct
        ,
        msg:"defrgthyuj"
    })
})
}

exports.creates=(req,res)=>{
    const name = req.body.name;
    const description = req.body.description;
    const photo = req.file.filename;
    const price=req.body.price;
    const quantity=req.body.quantity;
    const shipping=req.body.shipping;



    const newproductdata={
        name,
        description,
        photo,
        price,
        quantity,
        shipping




    }
    const newproduct=new Product(newproductdata)
    newproduct.save()
    .then((data) => res.json({msg:'User Added',data}))
    .catch(err => res.status(400).json('Error: ' + err));

}




exports.read=(req,res)=>{
    req.product.photo=undefined
    return res.json(req.product)
}

exports.productById=(req,res,next,id)=>{
    Product.findById(id).exec((err,product)=>{
      if(err || !product){
          return res.status(400).json({
              error:"product not found"
          })
      }
    
    req.product=product;
    next();
    })

}

//  exports.create12=(req,res)=>{
// const form = new formidable.IncomingForm();
// form.parse(req, function(err, fields, files){
//     if(err){
//         return res.status(400).json({
//             error:"Image could not be uploded"
//         })
//     }
   
//     var oldPath = files.profilePic?.path;
//     var newPath = path.join(__dirname, 'uploads')
//             + '/'+files.profilePic?.name
//     var rawData = fs.readFileSync(oldPath)
  
//     fs.writeFile(newPath, rawData, function(err){
//         if(err) console.log(err)
//         return res.send("Successfully uploaded")
//     })
// })

// }

exports.update=(req,res)=>{
    let form=new formidable.IncomingForm()
    form.KeepExtensions=true
    form.parse(req ,(err,fields,files)=>{
        if(err){
            return res.status(400).json({
                error:"Image could not be uploded"
            })
        }
         
        // const {name,description,price,category,quantity,shipping}=fields
        // if(!name || !description || !price || !category|| !quantity || !shipping){
        //     return res.status(400).json({
        //         error:"all fill are required"
        //     })
        // }


        let product =req.product;
        product=_.extend(product,fields)

        

        if(files.photo){
            product.photo.data= fs.readFileSync(files.photo.path)
            product.photo.contentType=files.photo.type;
        }
        product.save((err,result)=>{
            res.json(result)
       
            if(err){
                return res.status(400).json({
                    error:"gyhui"
                })
            }
            res.json(result)
        } )
    })

}


exports.list =(req,res)=>{
    let order=req.query.order ? req.query.order :'asc'
    let sortBy=req.query.sortBy ? req.query.sortBy :'_id'
    let limit =req.query.limit ? parseInt(req.query.limit) : 6 ;


    Product.find()
    .select("-photo")
     .sort([[sortBy,order]])
     .limit(limit)
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"Product not found"
            })
        }
        res.json(products)
    })
}
exports.listcategories=(req,res)=>{
    Product.distinct('category',{},(err,categories ) =>{
        if(err){
            return res.status(400).json({
                error:"catagory not found"
            })
        }
        res.json(categories)
    });

}

exports.listRelated=(req,res)=>{
    let limit=req.query.limit ? parseInt(req.query.limit) : 6;

    Product.find({_id:{$ne:req.product},category:req.product.category})
    .limit(limit)
    .populate('category','_id name')
    .exec((err,products)=>{
        if(err){
            return res.status(400).json({
                error:"product not found"
            })
        }
        res.json(products)
    })

}

exports.listBySearch=(req,res)=>{
    let order=req.query.order ? req.query.order :'desc'
    let sortBy=req.query.sortBy ? req.query.sortBy :'_id'
    let limit =req.query.limit ? parseInt(req.query.limit) : 100;
     let skip=parseInt(req.body.skip);
     let findArgs={}


     for(let key in req.body.filters){
         if(req.body.filters[key].length >0){
             if(key=="price"){
                 findArgs[key]={
                     $gre:req.body.filters[key][0],
                     $lte:req.body.filters[key][1]
                 };
             }else {
                 findArgs[key]=req.body.filters[key];
             }
         }
     }

 Product.find(findArgs)
   .select("-photo")
   .sort([[sortBy,order]])
   .skip(skip)
   .limit(limit)
   .exec((err,data)=>{
       if(err) return res.status(400).send(err)


       res.json({
           size:data.length,
           data
       })   
   })
}

exports.photo=(req,res,next)=>{
    if(req.product.photo.data){
        res.set("Content-Type",req.product.photo.contentType)
        return res.send(req.product.photo.data)
    }
    next()
}