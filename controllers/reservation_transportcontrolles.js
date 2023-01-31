const { default: axios } = require('axios')
const { USER } = require('../config/dbConfig')
const db=require('../models')
const Reservation_tarnsport=db.reservation_tarnsport
const User=db.user
const Avion=db.avion

//return tous les reservation de tarnsport
const getallreservationtarnsport=async(req,res)=>
{   
    let reservation= await Reservation_tarnsport.findAll()
    res.status(200).send(reservation)
}

// faire une reservation de tarnsport

const reservation_tarnsportpost=async(req,res)=>
{   
    const body=req.body
    let data=body.type==="bus"?await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/getonebus/${body.id_transport}`).then(res => res.data)// get data de bus
      :await Avion.findOne({where:{id:body.id_transport}}).then(res => res.dataValues).catch(err=>console.log(err))
    
      if(data!=null){
    if(Number(data.nb_place_reserver)+Number(body.nb_place)<=Number(data.nb_place)) // test sur nombre de place disponible
    {   
        let nouv_nb_place_reserver={nouveau_nb_place:Number(data.nb_place_reserver)+Number(body.nb_place)};
        let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues).catch((err)=> res.status(404).send(err))
        console.log(user)
        if(Number(user.solde)-Number(body.monatnt_total)>=0)
         {  
            body.type==="bus"? await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${body.id_transport}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
           : await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/avion/updateavionnbplacereserver/${body.id_transport}`,nouv_nb_place_reserver)
           body.solde=Number(body.monatnt_total)
           user.solde=Number(user.solde)-Number(body.monatnt_total)
           body.credit=0
            await User.update(user,{where:{id:body.userId}})
            let reservation=await Reservation_tarnsport.create(body)  // creation une reservation bus
            res.status(200).send(reservation) }
        else{
            const reste=Number(body.monatnt_total)-Number(user.solde)
            console.log(Number(user.credit)-reste)
            body.solde=Number(user.solde)
            if(Number(user.credit)-reste>=0)
             { 
                user.solde=0
                user.credit=Number(user.credit)-reste
                body.credit=reste
                await User.update(user,{where:{id:body.userId}})
                body.type==="bus"? await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${body.id_transport}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
              : await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/avion/updateavionnbplacereserver/${body.id_transport}`,nouv_nb_place_reserver)
                let reservation=await Reservation_tarnsport.create(body)  // creation une reservation bus
                res.status(200).send(reservation)
             }else{
                res.status(404).send("solde et credit insefisent")
             }
           
        }
    }else{
        res.status(200).send("aucune place desponible")
    }}
    else{
        res.status(200).send("aucune avion ou bus disponible")
    }
   
}

// // return les reservation d'une  tarnsport donnee

// const getallreservationtarnsportbybus=async(req,res)=>{
//     let id=req.params.id
//     const reservation=await Reservation_tarnsport.findAll({where:{busId:id}})
//     res.status(200).send(reservation)
// }
// return les reservation by id

const getallreservationtarnsportbyid=async(req,res)=>{
    let id=req.params.id
    const reservation=await Reservation_tarnsport.findAll({where:{id:id}})
    res.status(200).send(reservation)
}
// return les reservation d'une  user  donnee

const getallreservationtarnsportbyuser=async(req,res)=>{
    let id=req.params.id
    const reservation=await Reservation_tarnsport.findAll({where:{userId:id}})
    res.status(200).send(reservation)
}

//modefier les reservation d'une tarnsport

const updatereservationtarnsport=async(req,res)=>{
    let id=req.params.id
    let body=req.body
    let reservation=await Reservation_tarnsport.findOne({where:{id:id}}).then(res=>res.dataValues)
    if(reservation)
     {
        let datesys= new Date();
        let date=datesys-reservation.createdAt
        date=Math.floor(date/ (1000 * 86400 * 2) ) ;
         if(date<1){ // test sur time ne depase pas 48h 
            let data=reservation.type==="bus"?await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/getonebus/${reservation.id_transport}`).then(res => res.data)// get data de bus
            :await Avion.findOne({where:{id:reservation.id_transport}}).then(res => res.dataValues).catch(err=>console.log(err))
            const nb_total=(Number(data.nb_place_reserver)-Number(reservation.nb_place))+Number(req.body.nb_place)
            if(nb_total<=data.nb_place) // test sur nombre de place disponible
            {   
                let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues).catch((err)=> res.status(404).send(err))
               console.log(user)
                if((Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)>=0)
                {  console.log("test")
                    let nouv_nb_place_reserver={nouveau_nb_place:(data.nb_place_reserver-reservation.nb_place)+req.body.nb_place}; // nouveau nombre de place
                    reservation.type==="bus"? await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${reservation.id_transport}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
                    : await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/avion/updateavionnbplacereserver/${reservation.id_transport}`,nouv_nb_place_reserver)
                    body.solde=Number(body.monatnt_total)
                    user.solde=(Number(user.solde)+Number(reservation.solde))-Number(body.monatnt_total)
                    user.credit=Number(user.credit)+Number(reservation.credit)
                    body.credit=0
                    await Reservation_tarnsport.update(req.body,{where:{id:id}}).then(async(secc)=>await User.update(user,{where:{id:body.userId}})).catch(err=>console.log(err))  // update une reservation bus
                    let reservation2=await Reservation_tarnsport.findOne({where:{id:id}})
                    res.status(200).send(reservation2)}
                else{
                    const reste=Number(body.monatnt_total)-(Number(user.solde)+Number(reservation.solde))
                    body.solde=Number(body.monatnt_total)-reste
                    let test=reservation
                    if((Number(test.credit)+Number(user.credit))-reste>=0)
                     {  
                        user.solde=Number(0)
                        user.credit=(Number(test.credit)+Number(user.credit))-reste
                        body.credit=Number(reste)
                        let nouv_nb_place_reserver={nouveau_nb_place:(data.nb_place_reserver-test.nb_place)+req.body.nb_place}; // nouveau nombre de place
                        test.type==="bus"? await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${test.id_transport}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
                        : await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/avion/updateavionnbplacereserver/${test.id_transport}`,nouv_nb_place_reserver)
                        await Reservation_tarnsport.update(body,{where:{id:id}}).then(async(secc)=>await User.update(user,{where:{id:body.userId}}).catch(err=>res.status(404).send(err))).catch(err=>res.status(404).send(err))  // creation une reservation bus
                        let reservation2=await Reservation_tarnsport.findOne({where:{id:id}})
                        res.status(200).send(reservation2)
                     }else{
                        res.status(404).send("solde et credit insefisent")
                     }
                }
            }else{
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

// annulation de reservation place a une tarnsport 

const deletereservationtarnsport=async(req,res) => {
     let id=req.params.id
     const reservation= await Reservation_tarnsport.findOne({where: {id:id}})
     if(reservation)
     {
        let datesys= new Date();
        let date=datesys-reservation.createdAt
        date=Math.floor(date/ (1000 * 86400 * 2) ) ;
         if(date<1){ // test sur time ne depase pas 48h 
            let data=reservation.type==="bus"?await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/getonebus/${reservation.id_transport}`).then(res => res.data)// get data de bus
            :await Avion.findOne({where:{id:reservation.id_transport}}).then(res => res.dataValues).catch(err=>console.log(err))
            const nb_total=Number(data.nb_place_reserver)-Number(reservation.nb_place) // diminuer nombre de place reserver
            let nouv_nb_place_reserver={nouveau_nb_place: nb_total};
            reservation.type==="bus"? await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${reservation.id_transport}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
            : await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/avion/updateavionnbplacereserver/${reservation.id_transport}`,nouv_nb_place_reserver)
            let user=await User.findOne({where: {id:reservation.userId}}).then((res)=>res.dataValues).catch((err)=> res.status(404).send(err))
            user.credit=Number(reservation.credit)+Number(user.credit)
            user.solde=Number(reservation.solde)+Number(user.solde)
            console.log(user)
            await User.update(user,{where:{id:reservation.userId}}).catch((err)=> res.status(404).send(err))
           await Reservation_tarnsport.destroy({where: {id:id}}).catch((err)=> res.status(404).send(err)) // delete une reservation
           res.status(200).send("reservation deleted")  }
          else{
             res.status(200).send("aucune l'accès de annule reservation apres 48h")
          }
     }else{
        res.status(404).send("reservation not found")
     }
}


module.exports={
    getallreservationtarnsport,
    reservation_tarnsportpost,
    // getallreservationbusbybus,
    getallreservationtarnsportbyuser,
    updatereservationtarnsport,
    deletereservationtarnsport,
    getallreservationtarnsportbyid
 }