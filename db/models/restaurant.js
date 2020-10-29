// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const restaurantSchema = new Schema({
   _id: Schema.Types.Mixed,
   name: {
      'zh-CN': Schema.Types.String,
      'en-US': Schema.Types.String,
      'zh-HK': Schema.Types.String,
   },
   tags: [ String ],
   closed: Object,
   hours: [ Object ],
});

const RestaurantModel = mongoose.model('restaurants', restaurantSchema);

module.exports = RestaurantModel;
