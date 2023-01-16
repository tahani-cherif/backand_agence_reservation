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
    let bus=await Bus.create(body)
    res.status(200).send(bus)
    console.log(res)
}
// return bus by id
const getbus=async(req,res)=>
{
   let id=req.params.id
   const bus=await Bus.findOne({where:{id:id}})
   res.status(200).send(bus)
}

module.exports={
    getallbus,
    postbus,
    getbus
 }