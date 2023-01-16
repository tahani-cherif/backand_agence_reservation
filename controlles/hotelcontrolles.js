const db=require('../models')
const Hotel=db.hotel



//return tous les hotel ajouter a partire admin
const getallhotel=async(req,res)=>
{
    let hotel= await Hotel.findAll()
    res.status(200).send(hotel)
}

// ajouter hotel a partire admin

const posthotels=async(req,res)=>
{
    const body=req.body
    let hotel=await Hotel.create(body)
    res.status(200).send(hotel)
    console.log(res)
}


module.exports={
    getallhotel,
    posthotels
 }