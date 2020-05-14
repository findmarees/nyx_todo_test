const bcrypt = require('bcrypt');

const keys = require('../config/keys');
const jwt = require('jsonwebtoken');
const userModel = require('../models/User');
// const profileModel = require('../schemas/Profile');
// const orderModel = require('../schemas/Order');


const requireLogin = require('../middlewares/requireLogin');

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


// login
app.post('/api/login',async(req, res)=>{
    const { username, password} = req.body;

    // check if all fields given
    console.log(req.body)
    if( !username || !password)
        return res.status(400).json({ msg: 'Please Enter All Fields' });

    // check if already exist
 try{
    const user = await User.findOne( {username} );
    if(!user)
        return res.status(400).json({ msg: 'User Does not exist'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) 
        return res.status(400).json({ msg: 'Invalid Credential'});

     const token = jwt.sign({ id: user._id }, keys.jwtKey, { expiresIn: 1800 });
        if (!token) res.status(400).json({ msg: 'Couldnt sign the token'});
  
    res.status(200).json({
        token,
        user: {
          id: user._id,
          name: user.name,
          mail: user.mail
        }
      });
    
              
       
} catch(e){
    // error while getting user
    res.status(500).json({msg: e.toString()})
}
    
})


/**
 * @route POST /api/new_user
 * @description Create new user
 * @access Public
 * 
 */

app.post('/api/new_user',async(req, res)=>{
    const { username, mail, password} = req.body;

    // check if all fields given
    console.log(req.body)
    if( !username || !mail || !password)
        return res.status(400).json({ msg: 'Please Enter All Fields' });

    // check if already exist
 try{
    const user = await User.findOne( {mail} );
    if(user)
        return res.status(400).json({ msg: 'User already existed'});

    let newUser = new User({
        username,
        mail,
        password
    });

    // create salt & hash
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(newUser.password, salt, async(err, hash)=>{
            if(err) throw err;
            newUser.password = hash;
        try{
            const user = await newUser.save();
            /**
             * @param1 payload data
             * @param2 signature
             * @param3 session tiome 1800sec
             * @param4 callback
             */
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
            
        } catch(e){
            // error while saving user
            res.status(500).json({msg: e.toString()})
        }
           
              
        })
    })
    
} catch(e){
    // error while getting user
    res.status(500).json({msg: e.toString()})
}
    
});


app.get('/api/user', requireLogin, async(req, res) => {

    try{
        const myUser = await User.findById(req.user.id)
        .select('-password');
        

    if(myUser)
        res.json(myUser);
    
    res.json({msg: 'user not found'});
    } catch(e){
        res.status(500).json({msg: e.toString()})
    }
    
})

}