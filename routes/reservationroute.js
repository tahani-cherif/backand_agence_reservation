const reservationcontroller=require("../controllers/reservationcontrolles")
const router=require("express").Router()

router.get('/getallavion',reservationcontroller.getallavion)
router.get('/getoneavion/:id',avioncontroller.getavion)
router.post('/addavion',avioncontroller.postavion)
router.put('/updateavion/:id',avioncontroller.updateavion)
router.put('/updateavionnbplacereserver/:id',avioncontroller.updateavionnbplacereserver)
router.delete('/deleteavion/:id',avioncontroller.deleteavion)
module.exports=router