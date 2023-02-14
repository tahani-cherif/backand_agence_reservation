const adminController = require('../controllers/admincontrolles')

const router=require("express").Router()
const agenceAuth = require('../middleware/authantification')

router.post('/postadmin',adminController.postadmin)

router.post('/loginadmin',adminController.loginAdmin)
router.get('/test',agenceAuth.authAgence,adminController.checkAuth)


module.exports=router
