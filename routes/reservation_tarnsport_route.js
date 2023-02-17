const reservation_tarnsport_controller=require("../controllers/reservation_transportcontrolles")
const router=require("express").Router()

router.get('/getallreservationtransport',reservation_tarnsport_controller.getallreservationtarnsport)
router.post('/addreservationtransport',reservation_tarnsport_controller.reservation_tarnsportpost)
router.post('/countreservationtransport',reservation_tarnsport_controller.countReservation_tarnsport)
// router.get('/getreservationtransportbytransport/:id',reservation_bus_controller.getallreservationbusbybus)
router.get('/getallreservationtransportbyuser/:id',reservation_tarnsport_controller.getallreservationtarnsportbyuser)
router.get('/getreservationtransportbyid/:id',reservation_tarnsport_controller.getallreservationtarnsportbyid)
router.put('/updatereservationtransport/:id',reservation_tarnsport_controller.updatereservationtarnsport)
router.delete('/deletereservationtransport/:id',reservation_tarnsport_controller.deletereservationtarnsport)
module.exports=router