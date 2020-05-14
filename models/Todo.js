const mongoose = require('mongoose');
const { Schema } = mongoose;

const todoModel = {
    item: {type: String},
    status: {type: Boolean, default: false}
}

const todoSchema = new Schema({
    category:{type:String, required: true},
    title:{type:String, required: true},
    todos:[todoModel],
    created:{type:Date, default: Date.now},
    user: String
});


const model = mongoose.model('todos', todoSchema, 'Todos_collection');

// exports.getTodo = ()=>{
//     return todoSchema;
// }

exports.getTodoSchema = ()=>{
    return model;
};

