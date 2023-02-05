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
     {  let nouv_nb_place_reserver={nouveau_nb_place:Number(data.nb_place_reserver)+Number(body.nb_place)};
        let user=await User.findOne({where:{id:body.userId}}).then((res)=>res.dataValues)
        if(Number(user.solde)-Number(body.monatnt_total)>=0)
        {
         data.nb_place_reserver=Number(data.nb_place_reserver)+Number(body.nb_place)
         console.log(data.nb_place_reserver)
         await Hotel.update(data,{where:{id:body.hotelId}})
         body.solde=Number(body.monatnt_total)
            user.solde=Number(user.solde)-Number(body.monatnt_total)
            body.credit=0
            let reservation=await reservation_hotel.create(body).then(async(secc)=>await User.update(user,{where:{id:body.userId}}) ).catch((err)=>res.status(404).send(err))
            res.status(200).send({message:"reservation cree"})
       
        }else{
            const reste=Number(body.monatnt_total)-Number(user.solde)
            body.solde=Number(user.solde)
            if(Number(user.credit)-reste>=0)
            { user.solde=0
                user.credit=Number(user.credit)-reste
                body.credit=reste
                data.nb_place_reserver=Number(data.nb_place_reserver)+Number(body.nb_place)
                await Hotel.update(data,{where:{id:body.hotelId}})
                await reservation_hotel.create(body).then(async(secc)=>await User.update(user,{where:{id:body.userId}}) ).catch((err)=>res.status(404).send(err))  
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


module.exports={
    getallreserhotelt,
    postreservationhotel

 }