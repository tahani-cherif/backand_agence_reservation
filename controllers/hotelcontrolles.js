const fs= require('fs')
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
    let image=[]
    req.files.map(item=>image.push(item.path))
    console.log(req.files)
    const data={
        nom_hotel:body.nom_hotel,
        e_mail:body.e_mail,
        capacite:body.capacite,
        nb_place_reserver:body.nb_place_reserver,
        numero_telephone:body.numero_telephone,
        adresse:body.adresse,
        nb_etoile:body.nb_etoile,
        porcentage_chambre_triple:body.porcentage_chambre_triple,
        porcentage_chambre_quadruple:body.porcentage_chambre_quadruple,
        frais_chambre_single:body.frais_chambre_single,
        prix_demi_pension:body.prix_demi_pension,
        prix_pension_complete:body.prix_pension_complete,
        prix_all_inclusive:body.prix_all_inclusive,
        prix_all_inclusive_soft:body.prix_all_inclusive_soft,
        prix_petit_dejeuner:body.prix_petit_dejeuner,
        bebe_gratuit:body.bebe_gratuit,
        reduction_enfant:body.reduction_enfant,
        commision:body.commision,
        type_promotion:body.type_promotion,
        date_debut:body.date_debut,
        date_fin:body.date_fin,
        date_debut_promotion:body.date_debut_promotion,
        date_fin_promotion:body.date_fin_promotion,
        image_hotel:image,
        services_equipements:JSON.parse(body.services_equipements),
        capacite_chambre_quadriple:body.capacite_chambre_quadriple,
        capacite_chambre_triple:body.capacite_chambre_triple,
        capacite_chambre_double:body.capacite_chambre_double,
        capacite_chambre_single:body.capacite_chambre_single

      }
console.log(data)
    let hotel=await Hotel.create(data)
res.status(200).send(hotel)}

// return hotel by id
const gethotel=async(req,res)=>
{
   let id=req.params.id
   console.log("id",id)
   const hotel=await Hotel.findOne({where:{id:id}}).catch(err=> res.status(404).send(err) )
   res.status(200).send(hotel)
}


// update hotel par id

const updatehotel=async(req,res)=>{
    let id=req.params.id
    console.log(id)
    const hotel=await Hotel.findOne({where:{id:id}}).catch(err=> res.status(404).send(err) )
    console.log(req.body)
    if(hotel)
    {   
        await Hotel.update(req.body,{where:{id:id}}).catch(err=> res.status(404).send(err) )
        const hotel2=await Hotel.findOne({where:{id:id}}).catch(err=> res.status(404).send(err) )
        res.status(200).send(hotel2)
    }else
    {
        res.status(404).send("Hotel not found")
    }
     
}

// delete hotel par id

const deletehotel=async(req,res)=>{
    let id=req.params.id
    const hotel=await Hotel.findOne({where:{id:id}})
    const img=hotel.image_hotel
    img.map((e)=>{
    fs.unlinkSync(e)
    })
    if(hotel)
    {
        await Hotel.destroy({where:{id:id}})
        res.status(200).send("hotel deleted")
    }else{
        res.status(404).send("Hotel not found")
    }

}

// delete plusieur hotel par id

const deletehotels=async(req,res)=>{
    let tabId=req.body
    let tabverif=[]
    let message
    tabId.map(async(item)=>{
        const hotel=await Hotel.findOne({where:{id:item}})
        if(hotel)
        {   const img=JSON.parse(hotel.image_hotel)
            img.map((e)=>{
            fs.unlinkSync(e)
            })
            await Hotel.destroy({where:{id:item}})
             message="hotel deleted "+item
             tabverif.push(message)
        }else{
         message="Hotel not found "+item
        tabverif.push(message)
        }
    })
    setTimeout(() => {
        res.send(tabverif)
      }, "1000")

}
const countHotel=async(req,res)=>{ 
    const nb=await Hotel.count();
    res.status(200).send({nb:nb})
  }
module.exports={
    getallhotel,
    posthotels,
    gethotel,
    updatehotel,
    deletehotel,
    countHotel,
    deletehotels
 }