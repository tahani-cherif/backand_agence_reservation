const evenementcontroller=require("../controlles/evenementcontrolles")
const router=require("express").Router()

router.get('/getallevenement',evenementcontroller.getallevenement)
router.get('/getoneevenement/:id',evenementcontroller.getevenement)
router.post('/addevenement',evenementcontroller.postevenement)
module.exports=router