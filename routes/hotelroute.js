const hotelcontroller=require("../controlles/hotelcontrolles")
const { auth } = require("../middleware/authantification")
const router=require("express").Router()

router.get('/getallhotel',hotelcontroller.getallhotel)
router.get('/getonehotel/:id',hotelcontroller.gethotel)
// router.get('/getonehotel/:id',auth,hotelcontroller.gethotel)
router.post('/addhotel',hotelcontroller.posthotels)
module.exports=router