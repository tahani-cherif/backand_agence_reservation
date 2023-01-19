const clientcontroller=require("../controlles/clientcontrolles")
const router=require("express").Router()

router.get('/getallclient',clientcontroller.getallclient)
router.post('/postclient',clientcontroller.postclient)
router.get('/getclient/:id',clientcontroller.getclient)
router.delete('/deletclient/:id',clientcontroller.deletclient)

module.exports=router