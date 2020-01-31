// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const orderSchema = new Schema({
   payment: String,
   cart: Array,
   user: {
      _id: Schema.Types.ObjectId,
   },
   restaurant: {
      _id: Schema.Types.Mixed,
   },
});

const OrderModel = mongoose.model('orders', orderSchema);

module.exports = OrderModel;
