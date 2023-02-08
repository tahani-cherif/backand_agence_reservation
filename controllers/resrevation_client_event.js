const db=require('../models')
const reservation_client_event=db.reservation_client_event

//return tous les bus ajouter a partire admin
const getallRCE=async(req,res)=>
{   
     let reservation= await reservation_client_event.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(reservation)
}


const postRCE=async(req,res)=>
{
    const body=req.body
    let avion=await reservation_client_event.create(body).catch(err=>res.status(404).send(err));
    res.status(200).send(avion)
}

const getRCE=async(req,res)=>
{
   let id=req.params.id
   const avion=await reservation_client_event.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
   res.status(200).send(avion)
}

const deleteRCE=async(req,res)=>{
    let id=req.params.id
    const avion=await reservation_client_event.findOne({where:{reservationEvenementId:id}}).catch(err=>res.status(404).send(err))
    if(avion)
    {
        await reservation_client_event.destroy({where:{reservationEvenementId:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send({message:"reservation client EVENEMENT  deleted"})
    }else{
        res.status(404).send({message:"reservation client EVENEMENT not found"})
    }

}




module.exports={
    getallRCE,
    postRCE,
    getRCE,
    deleteRCE
 
 }