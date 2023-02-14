const db=require('../models')
const Chambre=db.chambre

//return tous les chambre 
const getallchambre=async(req,res)=>
{   
     let chambre= await Chambre.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(chambre)
}

// ajouter chambre a partire admin

const postchambre=async(req,res)=>
{
    const body=req.body
    let chambre=await Chambre.create(body).catch(err=>res.status(404).send(err));
    res.status(200).send(chambre)
}
// return chambre by id
const getchambre=async(req,res)=>
{
   let id=req.params.id
   const chambre=await Chambre.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
   res.status(200).send(chambre)
}

const countChambre=async()=> await Chambre.count();
module.exports={
getallchambre,
getchambre,
countChambre,
postchambre
 
 }