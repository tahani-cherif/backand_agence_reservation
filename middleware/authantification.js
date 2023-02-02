const jwt = require('jsonwebtoken')

const authAgence = async(req, res, next) =>{
    try {
        var token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, "b511c37237d9ce535dd3336c2df808c9a78==")
        next()
        
    } catch (e) {
        res.status(401).send("Unauthorized user")  
    }
}

module.exports = {
    authAgence
}