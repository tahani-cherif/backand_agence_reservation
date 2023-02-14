const agenceController = require('../controllers/usercontrolles')

const router=require("express").Router()
const agenceAuth = require('../middleware/authantification')

router.get('/getAllAgence',agenceController.getAllAgence)
router.post('/postAgence',agenceController.postAgence)
router.get('/getagence/:id',agenceController.getuser)
router.put('/updateAgence/:id',agenceController.updateAgence)
router.post('/loginAgence',agenceController.loginAgence)
router.delete('/detleteuser/:id',agenceController.deleteuser)
// router.get('/test',agenceAuth.authAgence,agenceController.checkAuth)


module.exports=router
