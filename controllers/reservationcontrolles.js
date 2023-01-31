const db=require('../models')
const reservation=db.reservation
const client=db.client

//return tous les bus ajouter a partire admin
const getallresv=async(req,res)=>
{   
     let avion= await reservation.findAll().catch(err=>res.status(404).send(err))
     res.status(200).send(avion)
}

const resrvation_tab=async(req,res)=>
 {
      const body=req.body
      const client=await reservation.findOne({where:{id:body.clientId}}).then(res=>res.dataValues).catch(err=>res.status(404).send(err))
     if(client==null)
     {
        const resv=await reservation.create(body).catch(err=>res.status(404).send(err))
        res.status(200).send(resv)
     }
    }




module.exports={
    getallresv,
    resrvation_tab
 }