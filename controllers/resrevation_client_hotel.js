const db=require('../models')
const reservation_client_hotel=db.reservation_client_hotel
const reservation_hotel=db.reservation_hotel

//return tous les bus ajouter a partire admin
const getallRCH=async(req,res)=>
{   
     let reservation= await reservation_client_hotel.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(reservation)
}


const postRCH=async(req,res)=>
{
    const body=req.body
    let avion=await reservation_client_hotel.create(body).catch(err=>res.status(404).send(err));
    res.status(200).send(avion)
}

const getRCH=async(req,res)=>
{
   let id=req.params.id
   const avion=await reservation_client_hotel.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
   res.status(200).send(avion)
}

const deleteRCH=async(req,res)=>{
    let id=req.params.id
    const avion=await reservation_client_hotel.findOne({where:{reservationHotelId:id}}).catch(err=>res.status(404).send(err))
    if(avion)
    {
        await reservation_client_hotel.destroy({where:{reservationHotelId:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send({message:"reservation client hotel  deleted"})
    }else{
        res.status(404).send({message:"reservation client hotel not found"})
    }

}

const countclient=async(req,res)=>{
    let id=req.params.id
    const reservationhotel=await reservation_hotel.findOne({where:{id:id}}).then(secc=>secc?.dataValues).catch(err=> res.satuts(404).send(err))
    if(reservationhotel)
   { const reserationclienthotel=await reservation_client_hotel.count({where:{reservationHotelId:id}})
     nb=reservationhotel.nb_place-reserationclienthotel
   res.status(200).send({nombre:nb})}
   else{
    res.status(200).send({message:"reservation not found"})
   }
}


module.exports={
    getallRCH,
    postRCH,
    getRCH,
    deleteRCH,
    countclient
 
 }