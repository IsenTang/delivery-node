// Require Mongoose
const mongoose = require('mongoose');

// Define a schema
const { Schema } = mongoose;

const usersSchema = new Schema({
   username: String,
   password: String,
   nickname: String,
   createdAt: Date,
   openid: String, // * wx用户标识
   updatedAt: { type: Date, default: Date.now },
});

const UsersModel = mongoose.model('Users', usersSchema);

module.exports = UsersModel;
