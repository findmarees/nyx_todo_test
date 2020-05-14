const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username:{type:String, unique: true, required: true},
    mail:{type:String, unique: true},
    password:{type:String, unique: true, required: true},
    created:{type:Date, default: Date.now}
});


const model = mongoose.model('users', userSchema, 'Users_collection');

exports.getUserSchema = ()=>{
    return model;
};

