var bcrypt = require('bcryptjs');

const db = require('../models')
var {sign} = require('jsonwebtoken');
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
    if(agences){
        const salt = bcrypt.genSaltSync(10)
        const mdpCrypt = bcrypt.hashSync(req.body.password, salt)
        req.body.password =mdpCrypt

        await User.update(req.body,{where:{id:id}})
        const agences=await User.findOne({where:{id:id}})
        res.status(200).send(agences)
    }else{
        res.status(404).send({message:"Agence not found"})
    }
     
}

//login user
const loginAgence = async (req, res) => { 
    const body = req.body
    
    const agence = await User.findOne({ where: { e_mail: body.e_mail } })
    if (agence) {
        const restPass = bcrypt.compareSync(body.password, agence.password)
        if (restPass) {
            var token = sign({ userId: body.id, userEmail: body.e_mail, userPassword: body.password, }, "b511c37237d9ce535dd3336c2df808c9a78==")
            agence.update({tokens:token})
            res.status(200).send(agence)  
        } else {
           res.status(400).send({message:"password not found"})        
        }


    } else {
        res.status(400).send({message:"e-mail not found"})
        
    }

}
const checkAuth =async (req,res) => {
    res.status(200).send("vous avez ete authentifier ")
}


// delete bus par id

const deleteuser=async(req,res)=>{
    let id=req.params.id
    const user=await User.findOne({where:{id:id}}).catch(err=>res.status(404).send(err))
    if(user)
    {
        await User.destroy({where:{id:id}}).catch(err=>res.status(404).send(err))
        res.status(200).send("user deleted")
    }else{
        res.status(404).send("user not found")
    }

}

module.exports={
    getAllAgence,
    postAgence,
    updateAgence,
    getuser,
    loginAgence,
    deleteuser,
    checkAuth
}