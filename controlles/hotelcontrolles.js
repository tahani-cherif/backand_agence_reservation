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
// return hotel by id
const gethotel=async(req,res)=>
{
   let id=req.params.id
   const hotel=await Hotel.findOne({where:{id:id}})
   res.status(200).send(hotel)
}

// update hotel par id

const updatehotel=async(req,res)=>{
    let id=req.params.id
    const hotel=await Hotel.findOne({where:{id:id}})
    if(hotel)
    {
        await Hotel.update(req.body,{where:{id:id}})
        const hotel=await Hotel.findOne({where:{id:id}})
        res.status(200).send(hotel)
    }else
    {
        res.status(404).send("Hotel not found")
    }
     
}

// delete hotel par id

const deletehotel=async(req,res)=>{
    let id=req.params.id
    const hotel=await Hotel.findOne({where:{id:id}})
    if(hotel)
    {
        await Hotel.destroy({where:{id:id}})
        res.status(200).send("hotel deleted")
    }else{
        res.status(404).send("Hotel not found")
    }

}

module.exports={
    getallhotel,
    posthotels,
    gethotel,
    updatehotel,
    deletehotel
 }