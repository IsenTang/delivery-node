const UsersModel = require('./models/users');

/**
 * create
 */
async function create(data) {
   const user = new UsersModel(data);

   const result = await user.save();

   return result;
}
/**
 * find one
 */
async function findOne(query) {
   const result = await UsersModel.findOne(query);

   return result;
}

/**
 * find
 */
async function find({ query }) {
   const result = await UsersModel.find(query).exec();

   return result;
}

/**
 * update
 */
async function update({ query, updated }) {
   const result = await UsersModel.update(query, updated, { upsert: true });

   return result;
}

/*
 * delete
 */
async function deleteOne({ query }) {
   await UsersModel.deleteOne(query);
}

module.exports = {
   create,
   findOne,
   find,
   update,
   deleteOne,
};
