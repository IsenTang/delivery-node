// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const menuSchema = new Schema({
   _id: Schema.Types.Mixed,
});

const MenuModel = mongoose.model('foods', menuSchema);

module.exports = MenuModel;
