const db=require('../models')
const Programme=db.programme

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
    const data={
        nom_programme:body.nom_programme,
        date_debut:body.date_debut,
        date_fin:body.date_fin,
        hotelId:body.hotelId || null,
        busId:body.busId || null,
        avionId:body.avionId || null,
        evenementId:body.evenementId || null,
        image_programme:req.file.path
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
    {
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