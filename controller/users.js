const _ = require('lodash');
const { encrypte, sign, compare } = require('../services/login');
const { create, findOne } = require('../db/users');
const Woops = require('../common/error');

/*
 * 登录
 */
async function login({ password, username }) {
  const result = await findOne({ username });

  if (_.isEmpty(result)) {
    throw new Woops('No user', 'No user');
  }

  const isMatch = await compare(password, result.password);

  if (isMatch) {
    return result;
  }
  throw new Woops('Password uncorrected', 'Password uncorrected');
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
