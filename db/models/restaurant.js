// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const restaurantSchema = new Schema({

});

const RestaurantModel = mongoose.model('restaurants', restaurantSchema);

module.exports = RestaurantModel;
