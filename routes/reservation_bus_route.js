const reservation_bus_controller=require("../controlles/reservation_buscontrolles")
const router=require("express").Router()

router.get('/getallreservationbus',reservation_bus_controller.getallreservationbus)
router.post('/addreservationbus',reservation_bus_controller.reservation_buspost)
module.exports=router