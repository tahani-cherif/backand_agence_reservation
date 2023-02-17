const db=require('../models')
const reservation_hotel=db.reservation_hotel
const User=db.user
const Hotel=db.hotel

//return tous les reservation hotel
const getallreserhotelt=async(req,res)=>
{   
    let reservation= await reservation_hotel.findAll()
    res.status(200).send(reservation)
}

const postreservationhotel=async(req,res)=>
{
    let body=req.body
    let data=await Hotel.findOne({where:{id:body.hotelId}}).then(det=>det.dataValues).catch(err=> res.status(404).send(err))
    console.log(data)
    if(data)
    {if((Number(data.nb_place_reserver)+Number(body.nb_place))<=Number(data.capacite))
     {
      let nouv_nb_place_reserver={nouveau_nb_place:Number(data.nb_place_reserver)+Number(body.nb_place)};
        let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues)
        if(Number(user.solde)-Number(body.monatnt_total)>=0)
        {
         data.nb_place_reserver=Number(data.nb_place_reserver)+Number(body.nb_place)
         console.log(data.nb_place_reserver)
         await Hotel.update(data,{where:{id:body.hotelId}})
         body.solde=Number(body.monatnt_total)
            user.solde=Number(user.solde)-Number(body.monatnt_total)
            body.credit=0
            let id
            console.log("test",data)
            const datahotel ={
               nb_place:body.nb_place,
               monatnt_total:body.monatnt_total,
               date_debut:body.date_debut,
               date_fin:body.date_fin,
               hotelId:body.hotelId,
               userId:body.userId,
               nom_agence:user.nom_agence,
               nom_hotel:data.nom_hotel,
               credit:body.credit,
               solde:body.solde,
               data_debut:body.date_debut,
               data_fin:body.date_fin,
               nb_nuit:body.nb_nuit
            }
            let reservation=await reservation_hotel.create(datahotel).then(async(secc)=>{
                id=secc.dataValues.id
                await User.update(user,{where:{id:body.userId}})} ).catch((err)=>res.status(404).send(err))
            res.status(200).send({id:id,message:"reservation cree"})
       
        }else{
            const reste=Number(body.monatnt_total)-Number(user.solde)
            body.solde=Number(user.solde)
            if(Number(user.credit)-reste>=0)
            { user.solde=0
                user.credit=Number(user.credit)-reste
                body.credit=reste
                data.nb_place_reserver=Number(data.nb_place_reserver)+Number(body.nb_place)
                await Hotel.update(data,{where:{id:body.hotelId}})
                let id
                console.log(user.nom_agence,data.nom_hotel)
                const datahotel ={
                  nb_place:body.nb_place,
                  monatnt_total:body.monatnt_total,
                  date_debut:body.date_debut,
                  date_fin:body.date_fin,
                  hotelId:body.hotelId,
                  userId:body.userId,
                  nom_agence:user.nom_agence,
                  nom_hotel:data.nom_hotel,
                  credit:body.credit,
                  solde:body.solde,
                  data_debut:body.date_debut,
                  data_fin:body.date_fin,
                  nb_nuit:body.nb_nuit
               }
                await reservation_hotel.create(datahotel).then(async(secc)=>{
                    id=secc.dataValues.id
                    await User.update(user,{where:{id:body.userId}})} ).catch((err)=>res.status(404).send(err))  
                res.status(200).send({message:"reservation cree"})
        }else{
            res.status(404).send({message:"solde et credit insefisent"})
        }}

     }else{
        res.status(200).send({message:"aucune place desponible"})
     }}else{
        res.status(404).send({message:"hotel not found"})
     }
}
const getallreservationhotelbyuser=async(req,res)=>{
   let id=req.params.id
   const reservation=await reservation_hotel.findAll({where:{userId:id}})
   res.status(200).send(reservation)
}
const updatereservationhotel=async(req,res)=>{
    let id=req.params.id
    let body=req.body
    let reservation=await reservation_hotel.findOne({where:{id:id}})
    if(reservation)
     {
        let datesys= new Date();
        let date=datesys-reservation.createdAt
        date=Math.floor(date/ (1000 * 86400 * 2) ) ;
         if(date<1){ // test sur time ne depase pas 48h 
            let data=await Hotel.findOne({where:{id:body.hotelId}}).then(res => res?.dataValues).catch(err=>res.status(404).send(err))
            const nb=Number(req.body.nb_place)-Number(reservation.nb_place)
            const nb_total=(Number(data.nb_place_reserver)-Number(reservation.nb_place))+Number(req.body.nb_place)
            if(nb_total<=data.capacite) // test sur nombre de place disponible
            {    
                let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues)
                if((Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)>=0)
                    {  console.log("id",id)
                       data.nb_place_reserver=(data.nb_place_reserver-reservation.nb_place)+req.body.nb_place
                        await Hotel.update(data,{where:{id:body.hotelId}}).catch((err)=>res.status(404).send(err))
                        body.solde=Number(body.monatnt_total)
                        user.solde=(Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)
                        user.credit=Number(user.credit)+Number(reservation.credit)
                        body.credit=0
                        await reservation_hotel.update(body,{where:{id:id}}).then(async(sec)=> await User.update(user,{where:{id:body.userId}}).catch((err)=> res.status(404).send(err)) ).catch((err)=> res.status(404).send(err))   // update une reservation bus
                        let reservation2=await reservation_hotel.findOne({where:{id:id}})
                        res.status(200).send(reservation2)
                    }
             else{
                let test=reservation
                const reste=Number(body.monatnt_total)-(Number(user.solde)+Number(test.solde))
                    body.solde=Number(body.monatnt_total)-reste
                    if((Number(test.credit)+Number(user.credit))-reste>=0)
                     {  
                        user.solde=Number(0)
                        user.credit=(Number(test.credit)+Number(user.credit))-reste
                        console.log(Number(test.credit),Number(user.credit),reste, user.credit)
                        body.credit=Number(reste)
                        let nouv_nb_place_reserver={nouveau_nb_place:(data.nb_place_reserver-test.nb_place)+req.body.nb_place}; // nouveau nombre de place
                        data.nb_place_reserver=(data.nb_place_reserver-test.nb_place)+req.body.nb_place
                        await Hotel.update(data,{where:{id:body.hotelId}}).catch((err)=>res.status(404).send(err))
                        // await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
                        await reservation_hotel.update(body,{where:{id:id}}).then(async(secc)=> await User.update(user,{where:{id:body.userId}}).catch(err=>res.status(404).send(err))).catch(err=>res.status(404).send(err))  // update une reservation bus
                        let reservation2=await reservation_hotel.findOne({where:{id:id}})
                        res.status(200).send(reservation2)
                     }else{
                        res.status(404).send("solde et credit insefisent")
                     }
             }}else{
                res.status(200).send({message:"aucune place desponible"})
            }
          }
          else{
            res.status(200).send({message:"aucune l'accès de modifier apres 48h"})
          }
     }else{
        res.status(404).send({message:"reservation not found"})
     }
}

const deletereservationhotel=async(req,res) => {
    let id=req.params.id
    const reservation= await reservation_hotel.findOne({where: {id:id}})
    if(reservation)
    {
       let datesys= new Date();
       let date=datesys-reservation.createdAt
       date=Math.floor(date/ (1000 * 86400 * 2) ) ;
        if(date<1){ // test sur time ne depase pas 48h 
            let data=await Hotel.findOne({where:{id:reservation.hotelId}}).then(res => res?.dataValues).catch(err=>res.status(404).send(err))
           const nb_total=Number(data.nb_place_reserver)-Number(reservation.nb_place) // diminuer nombre de place reserver
           let nouv_nb_place_reserver={nouveau_nb_place: nb_total};
           data.nb_place_reserver=nb_total
           await Hotel.update(data,{where:{id:data.id}}).catch((err)=>res.status(404).send(err))
        //    await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${data.id}`,nouv_nb_place_reserver) // update sur une bus
           let user=await User.findOne({where: {id:reservation.userId}}).then((res)=>res.dataValues).catch((err)=> res.status(404).send(err))
            user.credit=Number(reservation.credit)+Number(user.credit)
            user.solde=Number(reservation.solde)+Number(user.solde)
           await reservation_hotel.destroy({where: {id:id}}).then(async(sec)=> await User.update(user,{where:{id:reservation.userId}}).catch((err)=> res.status(404).send(err))).catch((err)=> res.status(404).send(err)) // delete une reservation
           res.status(200).send({message:"reservation deleted"}) 
           }
         else{
            res.status(200).send({message:"aucune l'accès de annule reservation apres 48h"})
         }
    }else{
       res.status(404).send({message:"reservation not found"})
    }
}

const countHotel=async(req,res)=>{ 
   const nb=await reservation_hotel.count();
   res.status(200).send({nb:nb})}
module.exports={
    getallreserhotelt,
    postreservationhotel,
    deletereservationhotel,
    updatereservationhotel,
    getallreservationhotelbyuser,
    countHotel
 }