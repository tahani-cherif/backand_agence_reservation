const avioncontroller=require("../controllers/avioncontrolles")
const router=require("express").Router()
const agenceAuth = require('../middleware/authantification')
router.get('/getallavion',agenceAuth.authAgence,avioncontroller.getallavion)
router.get('/countAvion',avioncontroller.countAvion)
router.get('/getoneavion/:id',avioncontroller.getavion)
router.post('/addavion',avioncontroller.postavion)
router.put('/updateavion/:id',avioncontroller.updateavion)
router.put('/updateavionnbplacereserver/:id',avioncontroller.updateavionnbplacereserver)
router.delete('/deleteavion/:id',avioncontroller.deleteavion)
module.exports=router