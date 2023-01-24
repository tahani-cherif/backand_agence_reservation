const hotelcontroller=require("../controllers/hotelcontrolles")
const { auth } = require("../middleware/authantification")
const router=require("express").Router()
const multer=require('multer')
const path=require('path')


const storage=multer.diskStorage({
    destination:"./image/",
    filename:(req,file,cb)=>{
    cb(null,Date.now()+path.extname(file.originalname))
    }
})

const upload=multer({
    storage:storage
    
}
)
router.get('/getallhotel',hotelcontroller.getallhotel)
router.get('/getonehotel/:id',hotelcontroller.gethotel)
// router.get('/getonehotel/:id',auth,hotelcontroller.gethotel)
router.post('/addhotel',upload.array('image_hotel',10),hotelcontroller.posthotels)
router.put('/updatehotel/:id',hotelcontroller.updatehotel)
router.delete('/deletehotel/:id',hotelcontroller.deletehotel)
router.delete('/deletehotels',hotelcontroller.deletehotels)
module.exports=router