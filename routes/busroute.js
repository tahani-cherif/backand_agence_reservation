const buscontroller=require("../controllers/buscontrolles")
const router=require("express").Router()

router.get('/getallbus',buscontroller.getallbus)
router.get('/getonebus/:id',buscontroller.getbus)
router.post('/addbus',buscontroller.postbus)
router.put('/updatebus/:id',buscontroller.updatebus)
router.put('/updatebusnbplacereserver/:id',buscontroller.updatebusnbplacereserver)
router.delete('/deletebus/:id',buscontroller.deletebus)
router.delete('/deletebuss',buscontroller.deletebuss)
module.exports=router