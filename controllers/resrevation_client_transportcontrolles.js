const db=require('../models')
const reservation_client_transport=db.reservation_client_transport

//return tous les bus ajouter a partire admin
const getallRCT=async(req,res)=>
{   
     let reservation= await reservation_client_transport.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(reservation)
}


const postRCT=async(req,res)=>
{
    const body=req.body
    let avion=await reservation_client_transport.create(body).catch(err=>res.status(404).send(err));
    res.status(200).send(avion)
}

const getRCT=async(req,res)=>
{
   let id=req.params.id
   const avion=await reservation_client_transport.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
   res.status(200).send(avion)
}

const deleteRCT=async(req,res)=>{
    let id=req.params.id
    const avion=await reservation_client_transport.findOne({where:{reservationTarnsportId:id}}).catch(err=>res.status(404).send(err))
    if(avion)
    {
        await reservation_client_transport.destroy({where:{reservationTarnsportId:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send({message:"reservation client transport  deleted"})
    }else{
        res.status(404).send({message:"reservation client transport not found"})
    }

}




module.exports={
    getallRCT,
    postRCT,
    getRCT,
    deleteRCT
 
 }