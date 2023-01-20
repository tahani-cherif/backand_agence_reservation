const db=require('../models')
const Client=db.client

//return tous les client ajouter a partire de user(agence)
const getallclient=async(req,res)=>
{   
     let client= await Client.findAll()
     res.status(200).send(client)
}

//add client
const postclient=async(req,res)=>
{
    const body=req.body
    let client=await Client.create(body)
    res.status(200).send(client)
}

// return client by id
const getclient=async(req,res)=>
{
   let id=req.params.id
   const client=await Client.findOne({where:{id:id}})
   if(client)
   {
    res.status(200).send(client)
   }else{
       res.status(404).send("client not found")
   }
}
// delete client par id

const deletclient=async(req,res)=>{
    let id=req.params.id
    const client=await Client.findOne({where:{id:id}})
    if(client)
    {
        await Client.destroy({where:{id:id}})
        res.status(200).send("client deleted")
    }else{
        res.status(404).send("client not found")
    }

}
module.exports={
    getallclient,
    postclient,
    getclient,
    deletclient
}