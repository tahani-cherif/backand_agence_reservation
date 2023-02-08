const clientcontroller=require("../controllers/clientcontrolles")
const router=require("express").Router()

router.get('/getallclient',clientcontroller.getallclient)
router.post('/postclient',clientcontroller.postclient)
router.get('/getclient/:id',clientcontroller.getclient)
router.get('/getclientbyemail',clientcontroller.getclientbymail)
router.delete('/deletclient/:id',clientcontroller.deletclient)

module.exports=router