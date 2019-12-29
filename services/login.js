const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const debug = require('debug')('login:token');

/**
 * config
 */
const secret = 'delivery-node';
const saltRounds = 10;

/*
 *  token
 * 1 day expires
 */
function sign(data) {
  return jwt.sign({
    data,
  }, secret, { expiresIn: 60 * 60 * 24 });
}


/*
 * decode token
 */
function decode(token) {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    debug(error);
    throw error;
  }
}


/*
 * bcrypt the password
 */
async function encrypte(password) {
  const hash = await bcrypt.hash(password, saltRounds);

  return hash;
}

/*
 * compare
 */
async function compare(password, passwordHash) {
  const isMatch = await bcrypt.compare(password, passwordHash);

  return isMatch;
}


module.exports = {
  sign,
  decode,
  encrypte,
  compare,
};
