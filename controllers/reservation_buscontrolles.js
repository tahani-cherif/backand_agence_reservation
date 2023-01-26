const { default: axios } = require('axios')
const db=require('../models')
const Reservation_bus=db.reservation_bus


//return tous les reservation de bus
const getallreservationbus=async(req,res)=>
{   
    let reservation= await Reservation_bus.findAll()
    res.status(200).send(reservation)
}

// faire une reservation de bus

const reservation_buspost=async(req,res)=>
{   
    const body=req.body
    let data=await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/getonebus/${body.busId}`).then(res => res.data)// get data de bus
    if(Number(data.nb_place_reserver)+Number(body.nb_place)<=Number(data.nb_place)) // test sur nombre de place disponible
    {   
        let nouv_nb_place_reserver={nouveau_nb_place:Number(data.nb_place_reserver)+Number(body.nb_place)};

        await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${body.busId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
        let reservation=await Reservation_bus.create(body)  // creation une reservation bus
        res.status(200).send(reservation)
    }else{
        res.status(200).send("aucune place desponible")
    }
   
}

// return les reservation d'une  bus donnee

const getallreservationbusbybus=async(req,res)=>{
    let id=req.params.id
    const reservation=await Reservation_bus.findAll({where:{busId:id}})
    res.status(200).send(reservation)
}
// return les reservation d'une  bus donnee

const getallreservationbusbyid=async(req,res)=>{
    let id=req.params.id
    const reservation=await Reservation_bus.findAll({where:{id:id}})
    res.status(200).send(reservation)
}
// return les reservation d'une  user  donnee

const getallreservationbusbyuser=async(req,res)=>{
    let id=req.params.id
    const reservation=await Reservation_bus.findAll({where:{hotelId:id}})
    res.status(200).send(reservation)
}

//modefier les reservation d'une bus

const updatereservationbus=async(req,res)=>{
    let id=req.params.id
    let reservation=await Reservation_bus.findOne({where:{id:id}})
    if(reservation)
     {
        let datesys= new Date();
        let date=datesys-reservation.createdAt
        date=Math.floor(date/ (1000 * 86400 * 2) ) ;
         if(date<1){ // test sur time ne depase pas 48h 
            const data=await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/getonebus/${reservation.busId}`).then(res => res.data) // get une bus by id
            const nb_total=(Number(data.nb_place_reserver)-Number(reservation.nb_place))+Number(req.body.nb_place)
            if(nb_total<=data.nb_place) // test sur nombre de place disponible
            {   
                let nouv_nb_place_reserver={nouveau_nb_place:(data.nb_place_reserver-reservation.nb_place)+req.body.nb_place}; // nouveau nombre de place
               await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${req.body.busId}`,nouv_nb_place_reserver)// update nombre de place reserver d'une bus
               await Reservation_bus.update(req.body,{where:{id:id}})  // update une reservation bus
               let reservation2=await Reservation_bus.findOne({where:{id:id}})
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

// annulation de reservation place a une bus 

const deletereservationbus=async(req,res) => {
     let id=req.params.id
     const reservation= await Reservation_bus.findOne({where: {id:id}})
     if(reservation)
     {
        let datesys= new Date();
        let date=datesys-reservation.createdAt
        date=Math.floor(date/ (1000 * 86400 * 2) ) ;
         if(date<1){ // test sur time ne depase pas 48h 
            const data=await axios.get(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/getonebus/${reservation.busId}`).then(res => res.data) // get une bus
            const nb_total=Number(data.nb_place_reserver)-Number(reservation.nb_place) // diminuer nombre de place reserver
            let nouv_nb_place_reserver={nouveau_nb_place: nb_total};
            await axios.put(`${process.env.NEXT_PUBLIC_BACK_RESERVATION_AGENCE}/api/bus/updatebusnbplacereserver/${data.id}`,nouv_nb_place_reserver) // update sur une bus
            await Reservation_bus.destroy({where: {id:id}}) // delete une reservation
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
    getallreservationbus,
    reservation_buspost,
    getallreservationbusbybus,
    getallreservationbusbyuser,
    updatereservationbus,
    deletereservationbus,
    getallreservationbusbyid
 }