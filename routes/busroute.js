const buscontroller=require("../controlles/buscontrolles")
const router=require("express").Router()

router.get('/getallbus',buscontroller.getallbus)
router.get('/getonebus/:id',buscontroller.getbus)
router.post('/addbus',buscontroller.postbus)
module.exports=router