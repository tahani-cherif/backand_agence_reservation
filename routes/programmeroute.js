const programmecontroller=require("../controllers/programmecontrolles")
const router=require("express").Router()

router.get('/getallprogramme',programmecontroller.getallprogramme)
router.get('/getoneprogramme/:id',programmecontroller.getprogramme)
router.post('/addprogramme',programmecontroller.postprogramme)
router.put('/updateprogramme/:id',programmecontroller.updateprogramme)
router.delete('/deleteprogramme/:id',programmecontroller.deleteprogramme)
module.exports=router