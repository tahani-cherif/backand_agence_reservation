const fs= require('fs')
const db=require('../models')
const Evenement=db.evenement

//return tous les evenement ajouter a partire admin
const getallevenement=async(req,res)=>
{   
     let evenement= await Evenement.findAll()
     res.status(200).send(evenement)
}

// ajouter evenement a partire admin

const postevenement=async(req,res)=>
{
    const body=req.body
    const data={
        nom_evenement:body.nom_evenement,
        description:body.description,
        nb_place:body.nb_place,
        nb_place_reserver:body.nb_place_reserver,
        prix_evenement:body.prix_evenement,
        date_debut:body.date_debut,
        date_fin:body.date_fin,
        image_evenement:req.file.path
    }
    let evenement=await Evenement.create(data)
    res.status(200).send(evenement)
}
// return evenement by id
const getevenement=async(req,res)=>
{
   let id=req.params?.id || req
   const evenement=await Evenement.findOne({where:{id:id}})
   res.status(200).send(evenement)
}

// update evenement par id

const updateevenement=async(req,res)=>{
    let id=req.params.id
    const evenement=await Evenement.findOne({where:{id:id}})
    if(evenement)
    {
        await Evenement.update(req.body,{where:{id:id}})
        const evenement=await Evenement.findOne({where:{id:id}})
        res.status(200).send(evenement)
    }else
    {
        res.status(404).send("Hotel not found")
    }
     
}

// update sur nombre de place reserver d'une evenement

const updateevenementsnbplacereserver=async(req,res)=>{
    let id=req.params.id
    let evenement=await Evenement.findOne({where:{id:id}}) // recherche une evenement par id
    
    if(evenement)
    {   evenement.nb_place_reserver=req.body.nouveau_nb_place
        const x=evenement.dataValues
        await Evenement.update(x,{where:{id:id}})
         const data=await Evenement.findOne({where:{id:id}})
        res.status(200).send(data)
    }else
    {
        res.status(404).send("evenement not found")
    }
     
}
// delete evenement par id

const deleteevenement=async(req,res)=>{
    let id=req.params.id
    const evenement=await Evenement.findOne({where:{id:id}})
    if(evenement)
    {   fs.unlinkSync(evenement.image_evenement)
        await Evenement.destroy({where:{id:id}})
        res.status(200).send("hotel deleted")
    }else{
        res.status(404).send("Hotel not found")
    }

}

// delete plusieur bus par id

const deleteevenements=async(req,res)=>{
    let tabId=req.body
    let tabverif=[]
    let message
    tabId.map(async(item)=>{
        console.log(String(evenement.image_evenement).substring(1,String(evenement.image_evenement).length-1))
        const evenement=await Evenement.findOne({where:{id:item}})
        
        if(evenement)
        {   let x=String(evenement.image_evenement).substring(1,String(evenement.image_evenement).length-1)
             fs.unlinkSync(x)
            await Evenement.destroy({where:{id:item}})
             message="bus deleted "+item
             tabverif.push(message)
        }else{
         message="bus not found "+item
        tabverif.push(message)
        }
    })
    setTimeout(() => {
        res.send(tabverif)
      }, "1000")

}


module.exports={
    getallevenement,
    postevenement,
    getevenement,
    updateevenement,
    deleteevenement,
    deleteevenements,
    updateevenementsnbplacereserver
 }