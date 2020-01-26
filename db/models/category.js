// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const categorySchema = new Schema({
   _id: Schema.Types.Mixed,
});

const CategoryModel = mongoose.model('categories', categorySchema);

module.exports = CategoryModel;
