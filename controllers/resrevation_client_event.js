const db=require('../models')
const reservation_client_event=db.reservation_client_event
const reservation_evenement=db.reservation_evenement
const dbclient=db.client
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
const countclient=async(req,res)=>{
    let id=req.params.id
    const reservationevent=await reservation_evenement.findOne({where:{id:id}}).then(secc=>secc?.dataValues).catch(err=> res.satuts(404).send(err))
   if(reservationevent)
   { const reserationclientevent=await reservation_client_event.count({where:{reservationEvenementId:id}})
     nb=reservationevent.nb_place-reserationclientevent
     res.status(200).send({nombre:nb})}
   else{
    res.status(200).send({message:"reservation not found"})
   }
}



const getclientbyreservation=async(req,res)=>{
    let id=req.params.id
    const reservation=await reservation_client_event.findAll({where:{reservationEvenementId:id}}).catch(err=> res.satuts(404).send(err))
    let client=[]
    reservation.map(async(item)=>{
        x=await dbclient.findOne({where:{id:item.clientId}})
        client.push(x)
    })

    setTimeout(() => {
        res.status(200).send(client)
      }, 1000)

}
const countreservation_client_event=async(req,res)=> await reservation_client_event.count();
module.exports={
    getallRCE,
    postRCE,
    getRCE,
    deleteRCE,
    countclient,
    countreservation_client_event,
    getclientbyreservation
 
 }