const db=require('../models')
const Chambre=db.chambre
const Hotel=db.hotel

//return tous les chambre 
const getallchambre=async(req,res)=>
{   
     let chambre= await Chambre.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(chambre)
}

// ajouter chambre a partire admin

const postchambre=async(req,res)=>
{
    const body=req.body
    const hotel= await Hotel.findOne({where:{id:body.hotelId}}).then(sec=>sec.dataValues).catch(err=> res.status(404).send(err))
    console.log(hotel)
    if(parseInt(body.type)==1)
    {     console.log(hotel.nb_place_reserver)
        const place_disponible=hotel.capacite_chambre_single-hotel.nb_place_reserver_single
        if(place_disponible>0)
        {    hotel.nb_place_reserver_single=hotel.nb_place_reserver_single+1
             hotel.nb_place_reserver=parseInt(hotel.nb_place_reserver_quadripl)+parseInt(hotel.nb_place_reserver_triple)+parseInt(hotel.nb_place_reserver_double)+parseInt(hotel.nb_place_reserver_single)
             console.log(hotel.nb_place_reserver)
             let data
            let chambre=await Chambre.create(body).then(async(secc)=>{
              data=secc.dataValues
             await Hotel.update(hotel,{where:{id:body.hotelId}}).catch(err=>res.status(404).send(err))
             res.status(200).send(data)})
             .catch(err=>res.status(404).send(err));
        }
        else
        {
            res.status(404).send({message:"aucune chambre single disponnible"})
        }
    }else if(parseInt(body.type)==2)
    {
        const place_disponible=hotel.capacite_chambre_double-hotel.nb_place_reserver_double
        if(place_disponible>0)
        {     hotel.nb_place_reserver_double=hotel.nb_place_reserver_double+1
             hotel.nb_place_reserver=hotel.nb_place_reserver_quadripl+hotel.nb_place_reserver_triple+hotel.nb_place_reserver_double+hotel.nb_place_reserver_single
            let data
            let chambre=await Chambre.create(body).then(async(secc)=>{
              data=secc.dataValues
             await Hotel.update(hotel,{where:{id:body.hotelId}}).catch(err=>res.status(404).send(err))
             res.status(200).send(data)})
             .catch(err=>res.status(404).send(err));
        }
        else
        {
            res.status(404).send({message:"aucune chambre double disponnible"})
        }
    }
    else if(parseInt(body.type)==3)
    {
        const place_disponible=hotel.capacite_chambre_triple-hotel.nb_place_reserver_triple
        if(place_disponible>0)
        {
            hotel.nb_place_reserver_triple=hotel.nb_place_reserver_triple+1
            hotel.nb_place_reserver=hotel.nb_place_reserver_quadripl+hotel.nb_place_reserver_triple+hotel.nb_place_reserver_double+hotel.nb_place_reserver_single
            let data
            let chambre=await Chambre.create(body).then(async(secc)=>{
              data=secc.dataValues
             await Hotel.update(hotel,{where:{id:body.hotelId}}).catch(err=>res.status(404).send(err))
             res.status(200).send(data)})
             .catch(err=>res.status(404).send(err));
        }
        else
        {
            res.status(404).send({message:"aucune chambre triple disponnible"})
        }
    }
    else if(parseInt(body.type)==4)
    {
        const place_disponible=hotel.capacite_chambre_quadriple-hotel.nb_place_reserver_quadriple
        if(place_disponible>0)
        {
            hotel.nb_place_reserver_quadriple=hotel.nb_place_reserver_quadriple+1
            hotel.nb_place_reserver=hotel.nb_place_reserver_quadripl+hotel.nb_place_reserver_triple+hotel.nb_place_reserver_double+hotel.nb_place_reserver_single
            let data
            let chambre=await Chambre.create(body).then(async(secc)=>{
              data=secc.dataValues
             await Hotel.update(hotel,{where:{id:body.hotelId}}).catch(err=>res.status(404).send(err))
             res.status(200).send(data)})
             .catch(err=>res.status(404).send(err));
        }
        else
        {
            res.status(404).send({message:"aucune chambre quadriple disponnible"})
        }
    }

}
// return chambre by id
const getchambre=async(req,res)=>
{
   let id=req.params.id
   const chambre=await Chambre.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
   res.status(200).send(chambre)
}

const countChambre=async()=> await Chambre.count();
module.exports={
getallchambre,
getchambre,
countChambre,
postchambre
 }