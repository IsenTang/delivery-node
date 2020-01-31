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
   createdAt: { type: Date, default: Date.now() },
   updatedAt: { type: Date, default: Date.now() },
});

const OrderModel = mongoose.model('orders', orderSchema);

module.exports = OrderModel;
