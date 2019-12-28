const jwt = require('jsonwebtoken');
const debug = require('debug')('login:token');

const secret = 'delivery-node';
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


module.exports = {
  sign,
  decode,
};
