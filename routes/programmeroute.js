const programmecontroller=require("../controllers/programmecontrolles")
const router=require("express").Router()

const multer=require('multer')
const path=require('path')


const storage=multer.diskStorage({
    destination:"./image/programme",
    filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
    
}
)


router.get('/getallprogramme',programmecontroller.getallprogramme)
router.get('/getoneprogramme/:id',programmecontroller.getprogramme)
router.post('/addprogramme',upload.single('image_programme'),programmecontroller.postprogramme)
router.put('/updateprogramme/:id',programmecontroller.updateprogramme)
router.delete('/deleteprogramme/:id',programmecontroller.deleteprogramme)
module.exports=router