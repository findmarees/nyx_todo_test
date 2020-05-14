const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
/**
 *  u can use this middleware whenever a secure trasaction or some senstivie data show check whether the user is login or not
 */
    // fetch token from the header
    const token = req.header('x-auth-token');
console.log(token)
    // check token
    if(!token)
        /// 401 -> unauthorized
        return res.status('401').json({msg: 'Token not found'})

        try{
        // verify token 
        const decoded = jwt.verify(token, keys.jwtKey);
        // Add user from payload
        req.user = decoded;
        next();
        } catch(e){
            res.status(400).json({msg:'Token is not valid'})
        }
    

};