// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const usersSchema = new Schema({
  username: String,
  password: String,
  nickname: String,
  createdAt: Date,
  updatedAt: { type: Date, default: Date.now() },
});

const usersModel = mongoose.model('Users', usersSchema);

module.exports = usersModel;
