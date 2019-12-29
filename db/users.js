const usersModel = require('./models/users');


/**
 * create
 */
async function create(data) {
  const user = new usersModel(data);

  const result = await user.save();

  return result;
}
/**
 * find one
 */
async function findOne(query) {
  const result = await usersModel.findOne(query);

  return result;
}

/**
 * find
 */
async function find({ query }) {
  const result = await usersModel.find(query).exec();

  return result;
}

/**
 * update
 */
async function update({ query, updated }) {
  const result = await usersModel.update(query, updated, { upsert: true });

  return result;
}

/*
 * delete
 */
async function deleteOne({ query }) {
  await usersModel.deleteOne(query);
}


module.exports = {
  create,
  findOne,
  find,
  update,
  deleteOne,
};
