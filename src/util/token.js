const jwt = require('jsonwebtoken');
const secret = "Aashiq";


const generateToken = (user)=>{

    const token = jwt.sign(user,secret,{expiresIn:"1h"})
    return token;
}

module.exports = {
    generateToken
}