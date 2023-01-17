const evenementcontroller=require("../controlles/evenementcontrolles")
const router=require("express").Router()

router.get('/getallevenement',evenementcontroller.getallevenement)
router.get('/getoneevenement/:id',evenementcontroller.getevenement)
router.post('/addevenement',evenementcontroller.postevenement)
router.put('/updateevenement/:id',evenementcontroller.updateevenement)
router.delete('/deleteevenement/:id',evenementcontroller.deleteevenement)
router.delete('/deleteevenements',evenementcontroller.deleteevenements)
module.exports=router