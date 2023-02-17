const RCHcontroller=require("../controllers/resrevation_client_hotel")
const router=require("express").Router()

router.get('/getallRCH',RCHcontroller.getallRCH)
router.get('/getoneRCH/:id',RCHcontroller.getRCH)
router.get('/getnbRCH/:id',RCHcontroller.countclient)
router.post('/addRCH',RCHcontroller.postRCH)
router.delete('/deleteRCH/:id',RCHcontroller.deleteRCH)
router.get('/getclientbyreservation/:id',RCHcontroller.getclientbyreservation)
module.exports=router