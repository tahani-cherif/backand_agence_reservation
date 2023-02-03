const chambrecontroller=require("../controllers/chambrecontrolles")
const router=require("express").Router()

router.get('/getallchambre',chambrecontroller.getallchambre)
router.get('/getonechambre/:id',chambrecontroller.getchambre)
router.post('/addachambre',chambrecontroller.postchambre)
module.exports=router