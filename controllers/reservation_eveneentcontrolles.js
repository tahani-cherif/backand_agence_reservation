const { default: axios } = require('axios')
const db=require('../models')
const reservation_evenement=db.reservation_evenement
const User=db.user

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
   // let data= evenementcontroller.getevenement(body.evenementId,res)
    let data=await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/getoneevenement/${body.evenementId }`).then(res => res.data)// get data de evenement
    if(Number(data.nb_place_reserver)+Number(body.nb_place)<=Number(data.nb_place)) // test sur nombre de place disponible
    {   
        let nouv_nb_place_reserver={nouveau_nb_place:Number(data.nb_place_reserver)+Number(body.nb_place)};
        let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues)
        if(Number(user.solde)-Number(body.monatnt_total)>=0)
        {  
            await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
            body.solde=Number(body.monatnt_total)
            user.solde=Number(user.solde)-Number(body.monatnt_total)
            body.credit=0
            let reservation=await reservation_evenement.create(body)  // creation une reservation evenement
            await User.update(user,{where:{id:body.userId}}) 
            res.status(200).send(reservation)}
        else{
            const reste=Number(body.monatnt_total)-Number(user.solde)
            body.solde=Number(user.solde)
            if(Number(user.credit)-reste>=0)
            { 
                user.solde=0
                user.credit=Number(user.credit)-reste
                body.credit=reste
               await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
               let reservation=await reservation_evenement.create(body)  // creation une reservation evenement
               await User.update(user,{where:{id:body.userId}})
               res.status(200).send(reservation)
        }else{
            res.status(404).send("solde et credit insefisent")
        }
    }}else{
        res.status(200).send("aucune place desponible")
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

            const data=await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/getoneevenement/${body.evenementId }`).then(res => res.data) // get une bus by id
            const nb=Number(req.body.nb_place)-Number(reservation.nb_place)
            const nb_total=(Number(data.nb_place_reserver)-Number(reservation.nb_place))+Number(req.body.nb_place)
            console.log(nb_total)
            if(nb_total<=data.nb_place) // test sur nombre de place disponible
            {     console.log(body)
                let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues).catch((err)=> res.status(404).send(err))
            if((Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)>=0)
            {  
                let nouv_nb_place_reserver={nouveau_nb_place:(data.nb_place_reserver-reservation.nb_place)+req.body.nb_place}; // nouveau nombre de place
               await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
               body.solde=(Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)
               user.solde=(Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)
               body.credit=0
               console.log(body)
               await reservation_evenement.update(body,{where:{id:id}})  // update une reservation bus
               await User.update(user,{where:{id:body.userId}})
               let reservation2=await reservation_evenement.findOne({where:{id:id}})
               res.status(200).send(reservation2)
            }
             else{
                console.log(body)
                const reste=Number(body.monatnt_total)-(Number(user.solde)+Number(reservation.solde))
                    console.log(Number(user.credit)-reste)
                    body.solde=Number(body.monatnt_total)-reste
                    // console.log(reste)
                    let test=reservation
                    if((Number(test.credit)+Number(user.credit))-reste>=0)
                     {  
                        user.solde=0
                        user.credit=(Number(test.credit)+Number(user.credit))-reste
                        body.credit=reste
                        let nouv_nb_place_reserver={nouveau_nb_place:(data.nb_place_reserver-test.nb_place)+req.body.nb_place}; // nouveau nombre de place
                        await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
                        await reservation_evenement.update(body,{where:{id:id}})  // update une reservation bus
                        await User.update(user,{where:{id:body.userId}})
                        let reservation2=await reservation_evenement.findOne({where:{id:id}})
                        res.status(200).send(reservation2)
                     }else{
                        res.status(404).send("solde et credit insefisent")
                     }

             }}else{
                res.status(200).send("aucune place desponible")
            }
          }
          else{
            res.status(200).send("aucune l'accès de modifier apres 48h")
          }
     }else{
        res.status(404).send("reservation not found")
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
           const data=await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/getoneevenement/${reservation.evenementId}`).then(res => res.data) // get une bus
           const nb_total=Number(data.nb_place_reserver)-Number(reservation.nb_place) // diminuer nombre de place reserver
           let nouv_nb_place_reserver={nouveau_nb_place: nb_total};
           await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/evenement/updateevenementsnbplacereserver/${data.id}`,nouv_nb_place_reserver) // update sur une bus
           let user=await User.findOne({where: {id:reservation.userId}}).then((res)=>res.dataValues).catch((err)=> res.status(404).send(err))
            user.credit=Number(reservation.credit)+Number(user.credit)
            user.solde=Number(reservation.solde)+Number(user.solde)
           await reservation_evenement.destroy({where: {id:id}}).catch((err)=> res.status(404).send(err)) // delete une reservation
           await User.update(user,{where:{id:reservation.userId}}).catch((err)=> res.status(404).send(err))
           res.status(200).send("reservation deleted") 
           }
         else{
            res.status(200).send("aucune l'accès de annule reservation apres 48h")
         }
    }else{
       res.status(404).send("reservation not found")
    }
}

module.exports={
    getallreservationevenement,
    reservation_evenementpost,
    getallreservationevenementbyevenement,
    getallreservationevenementbyuser,
    updatereservationevenement,
    deletereservationevenement,
    getreservationevenementbyid
}