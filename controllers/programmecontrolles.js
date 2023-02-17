const db=require('../models')
const Programme=db.programme
const Hotel=db.hotel
const Event=db.evenement
const Avion=db.avion
const Bus=db.bus
const fs= require('fs')

//return tous les programme ajouter a partire admin
const getallprogramme=async(req,res)=>
{   
     let programme= await Programme.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(programme)
}

// ajouter programme a partire admin

const postprogramme=async(req,res)=>
{
    const body=req.body
    let nom_hotel=""
    let nom_evenement=""
    let matricule=""
    let reference_avion=""
    if(body?.hotelId!=null || body?.hotelId!=undefined)
    {
        const event=await Hotel.findOne({where:{id:body?.hotelId}}).then(sec=>sec?.dataValues)
        nom_hotel=event?.nom_hotel
    }
    if(body?.evenementId!=null || body?.evenementId!=undefined)
    {
        const event=await Event.findOne({where:{id:body?.evenementId}}).then(sec=>sec?.dataValues)
        nom_evenement=event?.nom_evenement
    }
    if(body?.busId!=null || body?.busId!=undefined)
    {
        const event=await Bus.findOne({where:{id:body?.busId}}).then(sec=>sec?.dataValues)
        matricule=event?.matricule
    }
    if(body?.avionId!=null || body?.avionId!=undefined)
    {
        const event=await Avion.findOne({where:{id:body?.avionId}}).then(sec=>sec?.dataValues)
        reference_avion=Avion?.reference
    }
    const data={
        nom_programme:body.nom_programme,
        date_debut:body.date_debut,
        date_fin:body.date_fin,
        hotelId:body.hotelId || null,
        busId:body.busId || null,
        avionId:body.avionId || null,
        evenementId:body.evenementId || null,
        image_programme:req.file.path,
        nom_hotel:nom_hotel,
        nom_evenement:nom_evenement,
        matricule:matricule,
        reference_avion:reference_avion,
        point_depart:body.point_depart,
        point_arrive:body.point_arrive
    }
    let programme=await Programme.create(data).catch(err=>res.status(404).send(err));
    res.status(200).send(programme)
}
// return programme by id
const getprogramme=async(req,res)=>
{
   let id=req.params.id
   const programme=await Programme.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
   res.status(200).send(programme)
}


// update programme par id

const updateprogramme=async(req,res)=>{
    let id=req.params.id
    const programme=await Programme.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
    if(programme)
    {
        await Programme.update(req.body,{where:{id:id}}).catch(err=>res.status(404).send(err))
        const programme=await Programme.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send(programme)
    }else
    {
        res.status(404).send("programme not found")
    }
     
}


// delete programme par id

const deleteprogramme=async(req,res)=>{
    let id=req.params.id
    const programme=await Programme.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
    if(programme)
    {    fs.unlinkSync(programme.image_programme)
        await Programme.destroy({where:{id:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send("programme deleted")
    }else{
        res.status(404).send("programme not found")
    }

}


const countProgramme=async(req,res)=>{ 
    const nb=await Programme.count();
    res.status(200).send({nb:nb})}

module.exports={
    getallprogramme,
    postprogramme,
    getprogramme,
    updateprogramme,
    deleteprogramme,
    countProgramme
 }