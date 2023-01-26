const reservation_bus_controller=require("../controllers/reservation_buscontrolles")
const router=require("express").Router()

router.get('/getallreservationbus',reservation_bus_controller.getallreservationbus)
router.post('/addreservationbus',reservation_bus_controller.reservation_buspost)
router.get('/getreservationbusbybus/:id',reservation_bus_controller.getallreservationbusbybus)
router.get('/getallreservationbusbyuser/:id',reservation_bus_controller.getallreservationbusbyuser)
router.get('/getreservationbusbyid/:id',reservation_bus_controller.getallreservationbusbyid)
router.put('/updatereservationbus/:id',reservation_bus_controller.updatereservationbus)
router.delete('/deletereservationbus/:id',reservation_bus_controller.deletereservationbus)
module.exports=router