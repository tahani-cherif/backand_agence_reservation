const reservation_evenement_controller=require("../controllers/reservation_eveneentcontrolles")
const router=require("express").Router()

router.get('/getallreservationevenement',reservation_evenement_controller.getallreservationevenement)
router.get('/countreservationevent',reservation_evenement_controller.countReservation_evenement)
router.get('/getallreservationevenementbyevenement/:id',reservation_evenement_controller.getallreservationevenementbyevenement)
router.get('/getallreservationevenementbyuser/:id',reservation_evenement_controller.getallreservationevenementbyuser)
router.get('/getreservationevenementbyid/:id',reservation_evenement_controller.getreservationevenementbyid)
router.post('/postreservationevenement',reservation_evenement_controller.reservation_evenementpost)
router.put('/updatereservationevenement/:id',reservation_evenement_controller.updatereservationevenement)
router.delete('/deletereservationevenement/:id',reservation_evenement_controller.deletereservationevenement)


module.exports=router