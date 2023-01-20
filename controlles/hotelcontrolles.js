const db=require('../models')
const multer=require('multer')
const path=require('path')
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
    const data={
        nom_hotel:body.nom_hotel,
        e_mail:body.e_mail,
        numero_telephone:body.numero_telephone,
        adresse:body.adresse,
        nb_etoile:body.nb_etoile,
        prix_chambre_double:body.prix_chambre_double,
        prix_chambre_single:body.prix_chambre_single,
        prix_chambre_triple:body.prix_chambre_triple,
        prix_chambre_quadruple:body.prix_chambre_quadruple,
        prix_demi_pension:body.prix_demi_pension,
        prix_pension_complete:body.prix_pension_complete,
        prix_all_inclusive:body.prix_all_inclusive,
        commision:body.commision,
        date_debut:body.date_debut,
        date_fin:body.date_fin,
        image_hotel:image
      }
    let hotel=await Hotel.create(data)
    res.status(200).send(hotel)
}
// return hotel by id
const gethotel=async(req,res)=>
{
   let id=req.params.id
   const hotel=await Hotel.findOne({where:{id:id}})
   const data={
    id:hotel.id,
    nom_hotel:hotel.nom_hotel,
    e_mail:hotel.e_mail,
    numero_telephone:hotel.numero_telephone,
    adresse:hotel.adresse,
    nb_etoile:hotel.nb_etoile,
    prix_chambre_double:hotel.prix_chambre_double,
    prix_chambre_single:hotel.prix_chambre_single,
    prix_chambre_triple:hotel.prix_chambre_triple,
    prix_chambre_quadruple:hotel.prix_chambre_quadruple,
    prix_demi_pension:hotel.prix_demi_pension,
    prix_pension_complete:hotel.prix_pension_complete,
    prix_all_inclusive:hotel.prix_all_inclusive,
    commision:hotel.commision,
    date_debut:hotel.date_debut,
    date_fin:hotel.date_fin,
    services_equipements:JSON.parse(hotel.services_equipements),
    image_hotel:JSON.parse(hotel.image_hotel),
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
            numero_telephone:hotel.numero_telephone,
            adresse:hotel.adresse,
            nb_etoile:hotel.nb_etoile,
            prix_chambre_double:hotel.prix_chambre_double,
            prix_chambre_single:hotel.prix_chambre_single,
            prix_chambre_triple:hotel.prix_chambre_triple,
            prix_chambre_quadruple:hotel.prix_chambre_quadruple,
            prix_demi_pension:hotel.prix_demi_pension,
            prix_pension_complete:hotel.prix_pension_complete,
            prix_all_inclusive:hotel.prix_all_inclusive,
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
        {   
            await Hotel.destroy({where:{id:item}})
             message="hotel deleted "+item
             tabverif.push(message)
        console.log("test")
        }else{
         message="Hotel not found "+item
        tabverif.push(message)
        }
        console.log(tabverif)
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