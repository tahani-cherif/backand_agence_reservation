const reservationcontroller=require("../controllers/reservationcontrolles")
const router=require("express").Router()

router.post('/postreservationprogramme',reservationcontroller.postresvprogramme)
router.get('/countreservation',reservationcontroller.countresevationprogramme)
router.get('/getreservationprogramme',reservationcontroller.getallresv)
// router.get('/getoneavion/:id',avioncontroller.getavion)
// router.post('/addavion',avioncontroller.postavion)
// router.put('/updateavion/:id',avioncontroller.updateavion)
// router.put('/updateavionnbplacereserver/:id',avioncontroller.updateavionnbplacereserver)
// router.delete('/deleteavion/:id',avioncontroller.deleteavion)
module.exports=router