const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const debug = require('debug')('login:token');

/**
 * config
 */
const secret = 'delivery-node';
const saltRounds = 10;

/*
 *  token
 * 3 day expires
 */
function sign(data) {
   return jwt.sign({
      data,
   }, secret, { expiresIn: 60 * 60 * 24 * 3 });
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

/* 解码前端加密 */
async function bsDecode(str) {
   const decipher = crypto.createDecipher('aes192', 'deliveryIsen');

   let decrypted = decipher.update(str, 'hex', 'utf8');

   decrypted += decipher.final('utf8');

   return decrypted;
}

module.exports = {
   sign,
   decode,
   encrypte,
   compare,
   bsDecode,
};
