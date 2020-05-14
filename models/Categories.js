const mongoose = require('mongoose');
const { Schema } = mongoose;
const CategorySchema = new Schema({
    category: Array,
    user: String
});
const model = mongoose.model('category', CategorySchema, 'cat_collection');

exports.getCategorySchema = ()=>{
    return model;
};

