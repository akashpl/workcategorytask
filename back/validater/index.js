const { body, validationErrors } = require('express-validator');

exports.userSignupValidatar=(req,res,next)=>{
    req.check('name','Name is required').notEmpty()
    req.check('email','email is required')
          .matches(/.+\@.+\..+/)
          .withMessage("email must contain @")
          .isLenght({min:4,
        max:32
    })
    req.check('password','password is required').notEmpty()
    req.check("password")
    .isLenght({min : 6})
    .withMessage('password must contains atlest 6 chareters')
     .matches(/\d/)
     .withMessage('password contain number')

     const errors=req.validationErrors()
      if(errors){
          const firstError=errors.map(error=>{
              error.msg
          })[0];
          return res.status(400).json({error:firstError})
      }
      next()
}