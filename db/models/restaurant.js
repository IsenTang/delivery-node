// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const restaurantSchema = new Schema({
   _id: Schema.Types.Mixed,
});

const RestaurantModel = mongoose.model('restaurants', restaurantSchema);

module.exports = RestaurantModel;
