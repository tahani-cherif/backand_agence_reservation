const db=require('../models')
const Bus=db.bus

//return tous les bus ajouter a partire admin
const getallbus=async(req,res)=>
{   
     let bus= await Bus.findAll()
     res.status(200).send(bus)
}

// ajouter bus a partire admin

const postbus=async(req,res)=>
{
    const body=req.body
    let bus=await Bus.create(body).catch(err=>res.status(404).send(err));
    res.status(200).send(bus)
}
// return bus by id
const getbus=async(req,res)=>
{
   let id=req.params.id
   const bus=await Bus.findOne({where:{id:id}})
   res.status(200).send(bus)
}


// update bus par id

const updatebus=async(req,res)=>{
    let id=req.params.id
    const bus=await Bus.findOne({where:{id:id}})
    if(bus)
    {
        await Bus.update(req.body,{where:{id:id}})
        const bus=await Bus.findOne({where:{id:id}})
        res.status(200).send(bus)
    }else
    {
        res.status(404).send("Hotel not found")
    }
     
}

// update sur nombrepe place reserver d'une bus

const updatebusnbplacereserver=async(req,res)=>{
    let id=req.params.id
    let bus=await Bus.findOne({where:{id:id}}) // recherche une bus par id
    
    if(bus)
    {   bus.nb_place_reserver=req.body.nouveau_nb_place
        const x=bus.dataValues
        const update=await Bus.update(x,{where:{id:id}})
         const data=await Bus.findOne({where:{id:id}})
        res.status(200).send(data)
    }else
    {
        res.status(404).send("Hotel not found")
    }
     
}

// delete bus par id

const deletebus=async(req,res)=>{
    let id=req.params.id
    const bus=await Bus.findOne({where:{id:id}})
    if(bus)
    {
        await Bus.destroy({where:{id:id}})
        res.status(200).send("hotel deleted")
    }else{
        res.status(404).send("Hotel not found")
    }

}

// delete plusieur bus par id

const deletebuss=async(req,res)=>{
    let tabId=req.body
    let tabverif=[]
    let message
    tabId.map(async(item)=>{
        const bus=await Bus.findOne({where:{id:item}})
        if(bus)
        {   
            await Bus.destroy({where:{id:item}})
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
    getallbus,
    postbus,
    getbus,
    updatebus,
    deletebus,
    deletebuss,
    updatebusnbplacereserver
 
 }