const jwt = require('jsonwebtoken')

 const auth=(req,res,next)=>{
    let i="4N!ryoU6TcUZB7/d8GBB1XbGv0vo-ufggptUk=Hp08vsDSjX013K=S0v?YOEzcHJ";
    if(i=="4N!ryoU6TcUZB7/d8GBB1XbGv0vo-ufggptUk=Hp08vsDSjX013K=S0v?YOEzcHJ")
    {
        console.log("success");
        next();
    }else {
        console.log("error");
    }
}


const authAgence = async(req, res, next) =>{
    try {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "b511c37237d9ce535dd3336c2df808c9a78==")
        next()
        
    } catch (e) {
        res.status(401).send("erreur token")  
    }
}

module.exports={
    auth,
    authAgence
 }