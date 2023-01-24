var bcrypt = require('bcryptjs');

const db = require('../models')

const User = db.user


//return tous les user 
const getAllAgence=async(req,res)=>
{   
    try{
        let agences= await User.findAll()
        res.status(200).send(agences)
        
    }catch(e){
        res.status(400).send(e)

    }
}

//get user by id
const getuser=async(req,res)=>
{
   let id=req.params.id
   const agence=await User.findOne({where:{id:id}})
   res.status(200).send(agence)
}

// inscription user 
const postAgence=async(req,res)=>
{
    const body = req.body
    const salt = bcrypt.genSaltSync(10)
    const mdpCrypt = bcrypt.hashSync(body.password, salt)
    body.password = mdpCrypt
    let agences = await User.create(body).catch((e)=>{
        res.status(400).send(e)  
    })
    res.status(200).send(agences)

}

//update user
const updateAgence=async(req,res)=>{
    let id=req.params.id
    const agences=await User.findOne({where:{id:id}})
    if(agences)
    {
        const salt = bcrypt.genSaltSync(10)
        const mdpCrypt = bcrypt.hashSync(req.body.password, salt)
        req.body.password =mdpCrypt

        await User.update(req.body,{where:{id:id}})
        const agences=await User.findOne({where:{id:id}})
        res.status(200).send(agences)
    }else
    {
        res.status(404).send("user not found")
    }
     
}

module.exports={
    getAllAgence,
    postAgence,
    updateAgence,
    getuser
}