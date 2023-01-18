const { default: axios } = require('axios')
const db=require('../models')
const reservation_evenement=db.reservation_evenement
const evenementcontroller=require("../controlles/evenementcontrolles")

//return tous les reservation de evenement

const getallreservationevenement=async(req,res)=>
{   
    let reservation= await reservation_evenement.findAll()
    res.status(200).send(reservation)
}

// faire une reservation de evenement

const reservation_evenementpost=async(req,res)=>
{   
    const body=req.body
   // let data= evenementcontroller.getevenement(body.evenementId,res)
    let data=await axios.get(`http://localhost:8080/api/evenement/getoneevenement/${body.evenementId }`).then(res => res.data)// get data de evenement
    if(data.nb_place_reserver+body.nb_place<=data.nb_place) // test sur nombre de place disponible
    {   
        let nouv_nb_place_reserver={nouveau_nb_place:data.nb_place_reserver+body.nb_place};
       await axios.put(`http://localhost:8080/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
        let reservation=await reservation_evenement.create(body)  // creation une reservation bus
        res.status(200).send(reservation)
    }else{
        res.status(200).send("aucune place desponible")
    }
   
}

// return les reservation d'une  bus donnee

const getallreservationevenementbyevenement=async(req,res)=>{
    let id=req.params.id
    const reservation=await reservation_evenement.findAll({where:{evenementId:id}})
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

            const data=await axios.get(`http://localhost:8080/api/evenement/getoneevenement/${body.evenementId }`).then(res => res.data) // get une bus by id
            const nb=Number(req.body.nb_place)-Number(reservation.nb_place)
            const nb_total=(Number(data.nb_place_reserver)-Number(reservation.nb_place))+Number(req.body.nb_place)
            console.log(nb_total)
            if(nb_total<=data.nb_place) // test sur nombre de place disponible
            {   
                let nouv_nb_place_reserver={nouveau_nb_place:(data.nb_place_reserver-reservation.nb_place)+req.body.nb_place}; // nouveau nombre de place
               await axios.put(`http://localhost:8080/api/evenement/updateevenementsnbplacereserver/${body.evenementId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
               await reservation_evenement.update(req.body,{where:{id:id}})  // update une reservation bus
               let reservation2=await reservation_evenement.findOne({where:{id:id}})
               res.status(200).send(reservation2)
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
           const data=await axios.get(`http://localhost:8080/api/evenement/getoneevenement/${reservation.evenementId}`).then(res => res.data) // get une bus
           const nb_total=Number(data.nb_place_reserver)-Number(reservation.nb_place) // diminuer nombre de place reserver
           let nouv_nb_place_reserver={nouveau_nb_place: nb_total};
           await axios.put(`http://localhost:8080/api/evenement/updateevenementsnbplacereserver/${data.id}`,nouv_nb_place_reserver) // update sur une bus
           await reservation_evenement.destroy({where: {id:id}}) // delete une reservation
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
    deletereservationevenement
}