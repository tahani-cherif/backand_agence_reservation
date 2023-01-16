const hotelcontroller=require("../controlles/buscontrolles")
const router=require("express").Router()

router.get('/getallbus',hotelcontroller.getallbus)
router.get('/getonebus/:id',hotelcontroller.getbus)
router.post('/addbus',hotelcontroller.postbus)
module.exports=router