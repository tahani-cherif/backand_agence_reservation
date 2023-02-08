const emailcontroller=require("../controllers/controllermail/mailhotelcontroller")
const router=require("express").Router()

router.post('/sendmail',emailcontroller.sendEmailreservationhotel)
router.post('/sendmailagence',emailcontroller.sendEmailconfirmationreservationhotelagence)
module.exports=router