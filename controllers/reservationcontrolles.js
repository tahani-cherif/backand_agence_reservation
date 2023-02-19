const db=require('../models')
const reservation=db.reservation
const client=db.client
const reservation_tarnsport=db.reservation_tarnsport
const reservation_evenement=db.reservation_evenement
const reservation_hotel=db.reservation_hotel
//return tous les bus ajouter a partire admin
const getallresv=async(req,res)=>
{   
     let avion= await reservation.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(avion)
}
const postresvprogramme=async(req,res)=>
{   
     let avion= await reservation.create(req.body).catch(err=>res.status(404).send(err))
     res.status(200).send(avion)
}
const countresevationprogramme=async(req,res)=>{
  const nb=await reservation.count();
  res.status(200).send({nb:nb});
}
const resrvation_tab=async(req,res)=>
 {
      const body=req.body
      const client=await reservation.findOne({where:{clientId:body.clientId}}).then(res=>res?.dataValues)
      if(client==null)
     {  console.log("create")
         if(body.reservationTarnsportId!=null)
         {  let transp=await reservation_tarnsport.findOne({where:{id:body.reservationTarnsportId}}).then(res=>res?.dataValues)
          body.date_debut=transp.date_debut
          body.date_fin=transp.date_fin
         }else  if(body.reservationHotelId !=null)
         {  let hotel=await reservation_hotel.findOne({where:{id:body.reservationHotelId}}).then(res=>res?.dataValues)
          body.date_debut=hotel.date_debut
          body.date_fin=hotel.date_fin
         }else  if(body.reservationEvenementId !=null)
         {  let event=await reservation_evenement.findOne({where:{id:body.reservationEvenementId}}).then(res=>res?.dataValues)
          body.date_debut=event.date_debut
          body.date_fin=event.date_fin
         }
         const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
         res.status(200).send(resv)
     }else{
      if(body.reservationprogramme==null)
     { 
      if(client.reservationTarnsportId==null && body.reservationTarnsportId!=null)
          {
          transportresv=await reservation_tarnsport.findOne({where:{id:body.reservationTarnsportId}}).then(res=>res?.dataValues)
          if(Math.floor(client.date_debut/ (1000 * 86400 * 2) )<=Math.floor(transportresv.date_debut/ (1000 * 86400 * 2) ))
          { 
            const resv=await reservation.update(body,{where:{clientId:body.clientId}}).catch(err=>res.status(404).send(err))
            res.status(200).send(resv)
          }else{
            res.status(404).send({messagr:"verifier la date reservation  n'est pas compatible avec date de l'autre reservation avec cette client"})
          }
          }
      else  if(client.reservationHotelId==null && body.reservationHotelId!=null)
      {
      hotelresv=await reservation_hotel.findOne({where:{id:body.reservationHotelId}}).then(res=>res?.dataValues)
      if(Math.floor(client.date_debut/ (1000 * 86400 * 2) )<=Math.floor(hotelresv.date_debut/ (1000 * 86400 * 2) ))
      { 
        const resv=await reservation.update(body,{where:{clientId:body.clientId}}).catch(err=>res.status(404).send(err))
        res.status(200).send(resv)
      }else{
        res.status(404).send({messagr:"verifier la date reservation  n'est pas compatible avec date de l'autre reservation avec cette client"})
      }
      }
      else  if(client.reservationEvenementId==null && body.reservationEvenementId!=null)
      {
      eventresv=await reservation_evenement.findOne({where:{id:body.reservationEvenementId}}).then(res=>res?.dataValues)
      if(Math.floor(client.date_debut/ (1000 * 86400 * 2) )<=Math.floor(eventresv.date_debut/ (1000 * 86400 * 2) ))
      { 
        const resv=await reservation.update(body,{where:{clientId:body.clientId}}).catch(err=>res.status(404).send(err))
        res.status(200).send(resv)
      }else{
        res.status(404).send({messagr:"verifier la date reservation  n'est pas compatible avec date de l'autre reservation avec cette client"})
      }
      }else{
        res.status(404).send({messagr:"verifier la date reservation  n'est pas compatible avec date de l'autre reservation avec cette client"})
      }
      }
      else{
        if(body.reservationTarnsportId!=null)
         {  let transp=await reservation_tarnsport.findOne({where:{id:body.reservationTarnsportId}}).then(res=>res?.dataValues)
          body.date_debut=transp.date_debut
          body.date_fin=transp.date_fin
         }else  if(body.reservationHotelId !=null)
         {  let hotel=await reservation_hotel.findOne({where:{id:body.reservationHotelId}}).then(res=>res?.dataValues)
          body.date_debut=hotel.date_debut
          body.date_fin=hotel.date_fin
         }else  if(body.reservationEvenementId !=null)
         {  let event=await reservation_evenement.findOne({where:{id:body.reservationEvenementId}}).then(res=>res?.dataValues)
          body.date_debut=event.date_debut
          body.date_fin=event.date_fin
         }
         const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
         res.status(200).send(resv)
      }
     }
    }

const countreservation=async()=> await reservation.count();


module.exports={
  postresvprogramme,
  countresevationprogramme,
  getallresv
 }