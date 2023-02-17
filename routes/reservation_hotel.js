const reservation_hotel_controller=require("../controllers/reservation_hotelcontrolles")
const router=require("express").Router()

router.get('/getallreservationhotel',reservation_hotel_controller.getallreserhotelt)
router.get('/countreservationhotel',reservation_hotel_controller.countHotel)
router.get('/getalluserreservationhotel/:id',reservation_hotel_controller.getallreservationhotelbyuser)
router.post('/addreservationhotel',reservation_hotel_controller.postreservationhotel)
router.delete('/deletereservationhotel/:id',reservation_hotel_controller.deletereservationhotel)
router.put('/updatereservationhotel/:id',reservation_hotel_controller.updatereservationhotel)


module.exports=router