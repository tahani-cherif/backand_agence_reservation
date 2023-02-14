const RCTcontroller=require("../controllers/resrevation_client_transportcontrolles")
const router=require("express").Router()

router.get('/getallRCT',RCTcontroller.getallRCT)
router.get('/getoneRCT/:id',RCTcontroller.getRCT)
// router.get('/getclientbyreservation/:id',RCTcontroller.getclientbyreservation)
router.get('/getnbRCT/:id',RCTcontroller.countclient)
router.post('/addRCT',RCTcontroller.postRCT)
router.delete('/deleteRCT/:id',RCTcontroller.deleteRCT)
module.exports=router