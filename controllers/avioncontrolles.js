const db=require('../models')
const Avion=db.avion

//return tous les bus ajouter a partire admin
const getallavion=async(req,res)=>
{   
     let avion= await Avion.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(avion)
}

// ajouter bus a partire admin

const postavion=async(req,res)=>
{
    const body=req.body
    let avion=await Avion.create(body).catch(err=>res.status(404).send(err));
    res.status(200).send(avion)
}
// return bus by id
const getavion=async(req,res)=>
{
   let id=req.params.id
   const avion=await Avion.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
   res.status(200).send(avion)
}


// update bus par id

const updateavion=async(req,res)=>{
    let id=req.params.id
    const avion=await Avion.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
    if(avion)
    {
        await avion.update(req.body,{where:{id:id}}).catch(err=>res.status(404).send(err))
        const bus=await Avion.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send(avion)
    }else
    {
        res.status(404).send("avion not found")
    }
     
}

// update sur nombrepe place reserver d'une bus

const updateavionnbplacereserver=async(req,res)=>{
    let id=req.params.id
    let avion=await Avion.findOne({where:{id:id}}).catch(err=>res.status(404).send(err)) // recherche une bus par id
    
    if(avion)
    {   avion.nb_place_reserver=req.body.nouveau_nb_place
        const x=avion.dataValues
        const update=await Avion.update(x,{where:{id:id}}).catch(err=>res.status(404).send(err))
         const data=await Avion.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send(data)
    }else
    {
        res.status(404).send("avion not found")
    }
     
}

// delete bus par id

const deleteavion=async(req,res)=>{
    let id=req.params.id
    const avion=await Avion.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
    if(avion)
    {
        await Avion.destroy({where:{id:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send("avion deleted")
    }else{
        res.status(404).send("avion not found")
    }

}




module.exports={
    getallavion,
    postavion,
    getavion,
    updateavion,
    deleteavion,
    updateavionnbplacereserver
 
 }