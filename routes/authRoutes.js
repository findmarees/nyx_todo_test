const bcrypt = require('bcrypt');

const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
// const profileModel = require('../schemas/Profile');
// const orderModel = require('../schemas/Order');


// const requireLogin = require('../middlewares/requireLogin');

const User = userModel.getUserSchema();
// const Profile = profileModel.getProfileSchema();
// const Order = orderModel.getOrderSchema();



// const saltRounds = 10;


module.exports = app =>{

/**
 * @route GET /
 * @description Boilerplate setup
 * @access Public
 * 
 */
app.get('/',(req, res)=>{
    res.send('Hello');
});

/**
 * @route POST /api/new_user
 * @description Create new user
 * @access Public
 * 
 */

app.post('/api/auth',async(req, res)=>{
    const { mail, password} = req.body;

    // check if all fields given

    if( !mail || !password)
        return res.status(400).json({ msg: 'Please Enter All Fields' });

    // check if already exist
 try{
    const user = await User.findOne( {mail} );
    if(!user)
        return res.status(400).json({ msg: 'User Does not exist'});

   
    // validate hash
    bcrypt.compare(password, user.password)
        .then(isMatch =>{
            if(!isMatch) return res.status(400).json({ msg: 'Invalid credential' });

            jwt.sign(
                {id: user.id},
                keys.jwtKey,
                { expiresIn: 1800 },
                (err, token)=>{
                    if(err) throw err;
                    // let myResp = {
                    //     ...user,
                    //     token
                    // }
                    res.json({user, token})
                }
            )
        })
    
} catch(e){
    // error while getting user
    res.status(500).json({msg: e.toString()})
}
    
});

}