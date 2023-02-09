const RCEcontroller=require("../controllers/resrevation_client_event")
const router=require("express").Router()

router.get('/getallRCE',RCEcontroller.getallRCE)
router.get('/getoneRCE/:id',RCEcontroller.getRCE)
router.get('/getnbRCE/:id',RCEcontroller.countclient)
router.post('/addRCE',RCEcontroller.postRCE)
router.delete('/deleteRCE/:id',RCEcontroller.deleteRCE)
module.exports=router