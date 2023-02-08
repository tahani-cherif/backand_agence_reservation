const emailcontroller=require("../controllers/controllermail/mailhotelcontroller")
const router=require("express").Router()

router.post('/sendmail',emailcontroller.sendEmailreservationhotel)
module.exports=router