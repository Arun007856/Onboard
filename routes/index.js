var express=require('express')
var router=express.Router()
const process=require('../controllers/process')
const verifyJWT=require("../models/middleware")

router.post('/v1/register',process.Register)
router.post('/v1/login',process.login)
router.post('/v1/products',verifyJWT,process.products)

//admin
router.post('/v1/addprodcuts',verifyJWT,process.addproducts)
router.post('/v1/editproducts',verifyJWT,process.editProducts)
router.post('/v1/deleteprodcuts',verifyJWT,process.deleteProducts)

module.exports=router