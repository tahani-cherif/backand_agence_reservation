const buscontroller=require("../controlles/buscontrolles")
const router=require("express").Router()

router.get('/getallbus',buscontroller.getallbus)
router.get('/getonebus/:id',buscontroller.getbus)
router.post('/addbus',buscontroller.postbus)
router.put('/updatebus/:id',buscontroller.updatebus)
router.delete('/deletebus/:id',buscontroller.deletebus)
module.exports=router