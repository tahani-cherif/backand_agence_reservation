const reservation_bus_controller=require("../controlles/reservation_buscontrolles")
const router=require("express").Router()

router.get('/getallreservationbus',reservation_bus_controller.getallreservationbus)
router.post('/addreservationbus',reservation_bus_controller.reservation_buspost)
router.get('/getreservationbusbybus/:id',reservation_bus_controller.getallreservationbusbybus)
router.get('/getallreservationbusbyuser/:id',reservation_bus_controller.getallreservationbusbyuser)
module.exports=router