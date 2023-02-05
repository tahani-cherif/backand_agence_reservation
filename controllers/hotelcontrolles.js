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
        enfant_gratuit:body.enfant_gratuit,
        commision:body.commision,
        date_debut:body.date_debut,
        date_fin:body.date_fin,
        image_hotel:image,
        services_equipements:JSON.parse(body.services_equipements)
      }
console.log(data)
    let hotel=await Hotel.create(data)
res.status(200).send(hotel)}

// return hotel by id
const gethotel=async(req,res)=>
{
   let id=req.params.id
   const hotel=await Hotel.findOne({where:{id:id}})
   const data={
    id:hotel.id,
    nom_hotel:hotel.nom_hotel,
    e_mail:hotel.e_mail,
    capacite:hotel.capacite,
    nb_place_reserver:hotel.nb_place_reserver,
    numero_telephone:hotel.numero_telephone,
    adresse:hotel.adresse,
    nb_etoile:hotel.nb_etoile,
    porcentage_chambre_triple:hotel.porcentage_chambre_triple,
    porcentage_chambre_quadruple:hotel.porcentage_chambre_quadruple,
    frais_chambre_single:hotel.frais_chambre_single,
    prix_demi_pension:hotel.prix_demi_pension,
    prix_pension_complete:hotel.prix_pension_complete,
    prix_all_inclusive:hotel.prix_all_inclusive,
    prix_all_inclusive_soft:hotel.prix_all_inclusive_soft,
    enfant_gratuit:hotel.enfant_gratuit,
    commision:hotel.commision,
    date_debut:hotel.date_debut,
    date_fin:hotel.date_fin,
    services_equipements:hotel.services_equipements,
    image_hotel:hotel.image_hotel,
    createdAt:hotel.createdAt,
    updatedAt:hotel.updatedAt
  }
   res.status(200).send(data)
}


// update hotel par id

const updatehotel=async(req,res)=>{
    let id=req.params.id
    const hotel=await Hotel.findOne({where:{id:id}})
    if(hotel)
    {
        await Hotel.update(req.body,{where:{id:id}})
        const hotel=await Hotel.findOne({where:{id:id}})
        const data={
            id:hotel.id,
            nom_hotel:hotel.nom_hotel,
            e_mail:hotel.e_mail,
            capacite:hotel.capacite,
            nb_place_reserver:hotel.nb_place_reserver,
            numero_telephone:hotel.numero_telephone,
            adresse:hotel.adresse,
            nb_etoile:hotel.nb_etoile,
            porcentage_chambre_triple:hotel.porcentage_chambre_triple,
            porcentage_chambre_quadruple:hotel.porcentage_chambre_quadruple,
            frais_chambre_single:hotel.frais_chambre_single,
            prix_demi_pension:hotel.prix_demi_pension,
            prix_pension_complete:hotel.prix_pension_complete,
            prix_all_inclusive:hotel.prix_all_inclusive,
            prix_all_inclusive_soft:hotel.prix_all_inclusive_soft,
            enfant_gratuit:hotel.enfant_gratuit,
            commision:hotel.commision,
            date_debut:hotel.date_debut,
            date_fin:hotel.date_fin,
            services_equipements:JSON.parse(hotel.services_equipements),
            image_hotel:JSON.parse(hotel.image_hotel),
            createdAt:hotel.createdAt,
            updatedAt:hotel.updatedAt
          }
        res.status(200).send(data)
    }else
    {
        res.status(404).send("Hotel not found")
    }
     
}

// delete hotel par id

const deletehotel=async(req,res)=>{
    let id=req.params.id
    const hotel=await Hotel.findOne({where:{id:id}})
    const img=JSON.parse(hotel.image_hotel)
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

module.exports={
    getallhotel,
    posthotels,
    gethotel,
    updatehotel,
    deletehotel,
    deletehotels
 }