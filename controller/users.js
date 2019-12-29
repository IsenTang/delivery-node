const { encrypte, sign } = require('../services/login');
const { create, findOne } = require('../db/users');

async function login({ password, username }) {


}

/**
 * 注册
 */
async function register({ password, username }) {
  const hash = await encrypte(password);

  const data = {
    username,
    password: hash,
    nickname: '',
    createdAt: new Date(),
  };

  const user = await create(data);

  return user;
}

/**
 * 用户是否重复
 */
async function checkDuplicate(query) {
  const result = await findOne(query);

  if (result) {
    return true;
  }
  return false;
}

/**
 * 生成token
 */
async function createToken(data) {
  const result = await sign(data);

  return result;
}


module.exports = {
  login,
  register,
  checkDuplicate,
  createToken,
};
