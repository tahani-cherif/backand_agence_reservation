const hotelcontroller=require("../controlles/evenementcontrolles")
const router=require("express").Router()

router.get('/getallevenement',hotelcontroller.getallevenement)
router.get('/getoneevenement/:id',hotelcontroller.getevenement)
router.post('/addevenement',hotelcontroller.postevenement)
module.exports=router