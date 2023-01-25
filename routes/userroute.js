const agenceController = require('../controllers/usercontrolles')

const router=require("express").Router()

router.get('/getAllAgence',agenceController.getAllAgence)
router.post('/postAgence',agenceController.postAgence)
router.get('/getagence/:id',agenceController.getuser)
router.put('/updateAgence/:id',agenceController.updateAgence)
router.post('/loginAgence',agenceController.loginAgence)


module.exports=router
