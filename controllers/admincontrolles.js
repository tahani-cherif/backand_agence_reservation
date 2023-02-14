var bcrypt = require('bcryptjs');

const db = require('../models')
var {sign} = require('jsonwebtoken');
const Admin = db.admin

// inscription user 
const postadmin=async(req,res)=>
{
    const body = req.body
    const salt = bcrypt.genSaltSync(10)
    const mdpCrypt = bcrypt.hashSync(body.password, salt)
    body.password = mdpCrypt
    let agences = await Admin.create(body).catch((e)=>{
        res.status(400).send(e)  
    })
    res.status(200).send(agences)

}


//login user
const loginAdmin = async (req, res) => { 
    const body = req.body
    
    const agence = await Admin.findOne({ where: { e_mail: body.e_mail } })
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



module.exports={
    postadmin,
    loginAdmin,
    checkAuth
}