const agenceController = require('../controllers/usercontrolles')

const router=require("express").Router()

router.get('/getAllAgence',agenceController.getAllAgence)
router.post('/postAgence',agenceController.postAgence)
router.get('/getagence/:id',agenceController.getuser)


module.exports=router
