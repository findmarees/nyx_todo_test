const mongoose = require('mongoose');
const keys = require('../config/keys');


exports.mongoConnect = ()=>{
  mongoose.Promise = global.Promise;
    mongoose.connect(keys.mongoURI)
  .then(()=>console.log("Connected to DB"))
  .catch(err => {
    //; return res.send({ error: err.message });
    console.log('error');
    return console.error(err);
  });
};

