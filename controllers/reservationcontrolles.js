const db=require('../models')
const reservation=db.reservation
const client=db.client
const reservation_tarnsport=db.reservation_tarnsport
const reservation_evenement=db.reservation_evenement
//return tous les bus ajouter a partire admin
const getallresv=async(req,res)=>
{   
     let avion= await reservation.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(avion)
}

const resrvation_tab=async(req,res)=>
 {
      const body=req.body
      const client=await reservation.findOne({where:{clientId:body.clientId}}).then(res=>res?.dataValues)
      // .then(res=>res.dataValues).catch(err=>res.status(404).send(err))
      console.log(client)
    console.log("test")
      if(client==null)
     {  console.log("create")
        const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
        res.status(200).send(resv)
     }else{
      console.log(client)
      if(body.reservationprogramme==null)
     {console.log("qqqq") 
     console.log(client.reservationEvenementId)
     console.log(body.reservationEvenementId) 
     console.log(client.reservationTarnsportId)
     console.log(body.reservationTarnsportId) 
     console.log(client.reservationEvenementId!=null && body.reservationEvenementId!=null)
      if(client.reservationTarnsportId!=null && body.reservationTarnsportId!=null)
          { console.log("existe")
         
          transportclient= await reservation_tarnsport.findOne({where:{id:client.reservationTarnsportId}}).then(res=>res?.dataValues)
          transportresv=await reservation_tarnsport.findOne({where:{id:body.reservationTarnsportId}}).then(res=>res?.dataValues)
          eventclient=await reservation_evenement.findOne({where:{id:body.reservationEvenementId}}).then(res=>res?.dataValues)
          eventres=await reservation_evenement.findOne({where:{id:client.reservationEvenementId}}).then(res=>res?.dataValues)
          // date=Math.floor(transportclient.date_debut/ (1000 * 86400 * 2) ) ;
          console.log("body",body)
          console.log(transportclient,transportresv,eventclient,eventres)
         if(Math.floor(transportresv.date_debut/ (1000 * 86400 * 2) )==Math.floor(transportclient.date_debut/ (1000 * 86400 * 2) ))
          { 
            if(((Math.floor(eventclient?.date_debut/ (1000 * 86400 * 2) )>=Math.floor(transportresv?.date_debut/ (1000 * 86400 * 2) ))) || body?.reservationEvenementId==null)
          {  console.log("testesttest")
            // const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
            // res.status(200).send(resv)
            const resv=await reservation.update(body,{where:{clientId:body.clientId}}).catch(err=>res.status(404).send(err))
            res.status(200).send(resv)
          }else{
            res.status(404).send("verifier la date reservation evenement n'est pas compatible avec date de transport")
          }
          }else{
            console.log("create2")
           const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
            res.status(200).send(resv)
         }
      }
      else if((client.reservationEvenementId!=null && body.reservationEvenementId!=null) || (client.reservationEvenementId==null && body.reservationEvenementId!=null)){
        console.log("rrr")
         transportclient= await reservation_tarnsport.findOne({where:{id:client.reservationTarnsportId}}).then(res=>res?.dataValues)
         transportresv=await reservation_tarnsport.findOne({where:{id:body.reservationTarnsportId}}).then(res=>res?.dataValues)
         eventclient=await reservation_evenement.findOne({where:{id:body.reservationEvenementId}}).then(res=>res?.dataValues)
         eventres=await reservation_evenement.findOne({where:{id:client.reservationEvenementId}}).then(res=>res?.dataValues)
         
         if(Math.floor(eventres?.date_debut/ (1000 * 86400 * 2) )==Math.floor(eventclient?.date_debut/ (1000 * 86400 * 2) ) )
       
         { if((  Math.floor(transportresv?.date_debut/ (1000 * 86400 * 2) )>=Math.floor(eventclient?.date_debut/ (1000 * 86400 * 2) )) || body?.reservationTarnsportId==null) 
          {
            const resv=await reservation.update(body,{where:{clientId:body.clientId}}).catch(err=>res.status(404).send(err))
            res.status(200).send(resv)
          }else{
            res.status(404).send("verifier la date reservation de transport  n'est pas compatible avec date de evenement")
          }
          }else{
            console.log("create2222")
            const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
             res.status(200).send(resv)
          }
      } else if(client.reservationTarnsportId==null && client.reservationEvenementId==null ){
        const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
        res.status(200).send(resv)
      }else if(body.reservationTarnsportId==null && body.reservationEvenementId==null ){
        const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
        res.status(200).send(resv)
      }}else{
        const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
        res.status(200).send(resv)
      }
     }
    }




module.exports={
    getallresv,
    resrvation_tab
 }