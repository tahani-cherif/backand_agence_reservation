const db=require('../models')
const reservation_client_transport=db.reservation_client_transport
const reservation_transport=db.reservation_tarnsport
const dbclient=db.client

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
const countclient=async(req,res)=>{
    let id=req.params.id
    const reservationtransport=await reservation_transport.findOne({where:{id:id}}).then(secc=>secc?.dataValues).catch(err=> res.satuts(404).send(err))
    if(reservationtransport)
 {   const reserationclienttransport=await reservation_client_transport.count({where:{reservationTarnsportId:id}}).catch(err=> res.satuts(404).send(err))
     nb=reservationtransport.nb_place-reserationclienttransport
   res.status(200).send({nombre:nb})}
   else{
    res.status(200).send({message:"reservation not found"})
   }
}
const getclientbyreservation=async(req,res)=>{
    let id=req.params.id
    const reservation=await reservation_client_transport.findAll({where:{reservationTarnsportId:id}}).catch(err=> res.satuts(404).send(err))
    let client=[]
    reservation.map(async(item)=>{
        x=await dbclient.findOne({where:{id:item.clientId}})
        client.push(x)
    })

    setTimeout(() => {
        res.status(200).send(client)
      }, 1000)


}

const countreservation_client_transport=async()=> await reservation_client_transport.count();



module.exports={
    getallRCT,
    postRCT,
    getRCT,
    deleteRCT,
    countreservation_client_transport,
    countclient,
    getclientbyreservation
 
 }