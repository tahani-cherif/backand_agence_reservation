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
    
    let evenement=await Evenement.create(body)
    res.status(200).send(evenement)
    console.log(evenement)
}
// return evenement by id
const getevenement=async(req,res)=>
{
   let id=req.params.id
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

// delete evenement par id

const deleteevenement=async(req,res)=>{
    let id=req.params.id
    const evenement=await Evenement.findOne({where:{id:id}})
    if(evenement)
    {
        await Evenement.destroy({where:{id:id}})
        res.status(200).send("hotel deleted")
    }else{
        res.status(404).send("Hotel not found")
    }

}


module.exports={
    getallevenement,
    postevenement,
    getevenement,
    updateevenement,
    deleteevenement
 }