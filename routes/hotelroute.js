const hotelcontroller=require("../controlles/hotelcontrolles")
const router=require("express").Router()

router.get('/getallhotel',hotelcontroller.getallhotel)
router.post('/addhotel',hotelcontroller.posthotels)
module.exports=router