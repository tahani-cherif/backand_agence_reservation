const reservation_hotel_controller=require("../controllers/reservation_hotelcontrolles")
const router=require("express").Router()

router.get('/getallreservationhotel',reservation_hotel_controller.getallreserhotelt)
router.post('/addreservationhotel',reservation_hotel_controller.postreservationhotel)


module.exports=router