const { default: axios } = require('axios')
const db=require('../models')
const reservation_evenement=db.reservation_evenement
const User=db.user
const Evenement=db.evenement

//return tous les reservation de evenement

const getallreservationevenement=async(req,res)=>
{   
    let reservation= await reservation_evenement.findAll()
    res.status(200).send(reservation)
}

// faire une reservation de evenement

const reservation_evenementpost=async(req,res)=>
{   
    let body=req.body
    let data=await Evenement.findOne({where:{id:body.evenementId}}).then(res => res?.dataValues).catch(err=>res.status(404).send(err))
    if(data!=null){
    if(Number(data.nb_place_reserver)+Number(body.nb_place)<=Number(data.nb_place)) // test sur nombre de place disponible
    {   
        let nouv_nb_place_reserver={nouveau_nb_place:Number(data.nb_place_reserver)+Number(body.nb_place)};
        let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues)
        if(Number(user.solde)-Number(body.monatnt_total)>=0)
        {   data.nb_place_reserver=Number(data.nb_place_reserver)+Number(body.nb_place)
            await Evenement.update(data,{where:{id:body.evenementId}}).catch((err)=>res.status(404).send(err))
            body.solde=Number(body.monatnt_total)
            user.solde=Number(user.solde)-Number(body.monatnt_total)
            body.credit=0
            let id
            let reservation=await reservation_evenement.create(body).then(async(secc)=>{
                id=secc.dataValues.id
                await User.update(user,{where:{id:body.userId}})} ).catch((err)=>res.status(404).send(err))  // creation une reservation evenement
            res.status(200).send({id:id,message:"solde et credit insefisent"})}
        else{
            const reste=Number(body.monatnt_total)-Number(user.solde)
            body.solde=Number(user.solde)
            if(Number(user.credit)-reste>=0)
            { 
                user.solde=0
                user.credit=Number(user.credit)-reste
                body.credit=reste
                data.nb_place_reserver=Number(data.nb_place_reserver)+Number(body.nb_place)
                await Evenement.update(data,{where:{id:body.evenementId}}).catch((err)=>res.status(404).send(err))
                let id
                let reservation=await reservation_evenement.create(body).then(async(secc)=>{
                    id=secc.dataValues.id
                    await User.update(user,{where:{id:body.userId}})} ).catch((err)=>res.status(404).send(err))  // creation une reservation evenement
               res.status(200).send({id:id,message:"solde et credit insefisent"})
        }else{
            res.status(404).send({message:"solde et credit insefisent"})
        }
    }}else{
        res.status(200).send({message:"aucune place desponible"})
    }}
    else{
        res.status(200).send({message:"aucune evenement"})
    }
   
}

// return les reservation d'une  bus donnee

const getallreservationevenementbyevenement=async(req,res)=>{
    let id=req.params.id
    const reservation=await reservation_evenement.findAll({where:{evenementId:id}})
    res.status(200).send(reservation)
}
// return les reservation d'une  bus donnee

const getreservationevenementbyid=async(req,res)=>{
    let id=req.params.id
    const reservation=await reservation_evenement.findAll({where:{id:id}})
    res.status(200).send(reservation)
}
// return les reservation d'une  user  donnee

const getallreservationevenementbyuser=async(req,res)=>{
    let id=req.params.id
    const reservation=await reservation_evenement.findAll({where:{evenementUserId:id}})
    res.status(200).send(reservation)
}

const updatereservationevenement=async(req,res)=>{
    let id=req.params.id
    let body=req.body
    let reservation=await reservation_evenement.findOne({where:{id:id}})
    if(reservation)
     {
        let datesys= new Date();
        let date=datesys-reservation.createdAt
        date=Math.floor(date/ (1000 * 86400 * 2) ) ;
         if(date<1){ // test sur time ne depase pas 48h 
            let data=await Evenement.findOne({where:{id:body.evenementId}}).then(res => res?.dataValues).catch(err=>res.status(404).send(err))
            const nb=Number(req.body.nb_place)-Number(reservation.nb_place)
            const nb_total=(Number(data.nb_place_reserver)-Number(reservation.nb_place))+Number(req.body.nb_place)
            if(nb_total<=data.nb_place) // test sur nombre de place disponible
            {    
                let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues)
                if((Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)>=0)
                    {  console.log("id",id)
                       data.nb_place_reserver=(data.nb_place_reserver-reservation.nb_place)+req.body.nb_place
                        await Evenement.update(data,{where:{id:body.evenementId}}).catch((err)=>res.status(404).send(err))
                        body.solde=Number(body.monatnt_total)
                        user.solde=(Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)
                        user.credit=Number(user.credit)+Number(reservation.credit)
                        body.credit=0
                        await reservation_evenement.update(body,{where:{id:id}}).then(async(sec)=> await User.update(user,{where:{id:body.userId}}).catch((err)=> res.status(404).send(err)) ).catch((err)=> res.status(404).send(err))   // update une reservation bus
                        let reservation2=await reservation_evenement.findOne({where:{id:id}})
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
                        await Evenement.update(data,{where:{id:body.evenementId}}).catch((err)=>res.status(404).send(err))
                        // await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
                        await reservation_evenement.update(body,{where:{id:id}}).then(async(secc)=> await User.update(user,{where:{id:body.userId}}).catch(err=>res.status(404).send(err))).catch(err=>res.status(404).send(err))  // update une reservation bus
                        let reservation2=await reservation_evenement.findOne({where:{id:id}})
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

// annulation de reservation evenement 

const deletereservationevenement=async(req,res) => {
    let id=req.params.id
    const reservation= await reservation_evenement.findOne({where: {id:id}})
    if(reservation)
    {
       let datesys= new Date();
       let date=datesys-reservation.createdAt
       date=Math.floor(date/ (1000 * 86400 * 2) ) ;
        if(date<1){ // test sur time ne depase pas 48h 
            let data=await Evenement.findOne({where:{id:reservation.evenementId}}).then(res => res?.dataValues).catch(err=>res.status(404).send(err))
           const nb_total=Number(data.nb_place_reserver)-Number(reservation.nb_place) // diminuer nombre de place reserver
           let nouv_nb_place_reserver={nouveau_nb_place: nb_total};
           data.nb_place_reserver=nb_total
           await Evenement.update(data,{where:{id:data.id}}).catch((err)=>res.status(404).send(err))
        //    await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${data.id}`,nouv_nb_place_reserver) // update sur une bus
           let user=await User.findOne({where: {id:reservation.userId}}).then((res)=>res.dataValues).catch((err)=> res.status(404).send(err))
            user.credit=Number(reservation.credit)+Number(user.credit)
            user.solde=Number(reservation.solde)+Number(user.solde)
           await reservation_evenement.destroy({where: {id:id}}).then(async(sec)=> await User.update(user,{where:{id:reservation.userId}}).catch((err)=> res.status(404).send(err))).catch((err)=> res.status(404).send(err)) // delete une reservation
           res.status(200).send({message:"reservation deleted"}) 
           }
         else{
            res.status(200).send({message:"aucune l'accès de annule reservation apres 48h"})
         }
    }else{
       res.status(404).send({message:"reservation not found"})
    }
}
const countReservation_evenement=async()=> await reservation_evenement.count();

module.exports={
    getallreservationevenement,
    reservation_evenementpost,
    getallreservationevenementbyevenement,
    getallreservationevenementbyuser,
    updatereservationevenement,
    deletereservationevenement,
    countReservation_evenement,
    getreservationevenementbyid
}