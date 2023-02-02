const evenementcontroller=require("../controllers/evenementcontrolles")
const router=require("express").Router()

const multer=require('multer')
const path=require('path')


const storage=multer.diskStorage({
    destination:"./image/evenement",
    filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
    
}
)

router.get('/getallevenement',evenementcontroller.getallevenement)
router.get('/getoneevenement/:id',evenementcontroller.getevenement)
router.post('/addevenement',upload.single('image_evenement'),evenementcontroller.postevenement)
router.put('/updateevenement/:id',evenementcontroller.updateevenement)
router.put('/updateevenementsnbplacereserver/:id',evenementcontroller.updateevenementsnbplacereserver)
router.delete('/deleteevenement/:id',evenementcontroller.deleteevenement)
router.delete('/deleteevenements',evenementcontroller.deleteevenements)
module.exports=router