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
    let reservation=await Reservation_bus.create(body)
    res.status(200).send(reservation)
}

module.exports={
    getallreservationbus,
    reservation_buspost
 }