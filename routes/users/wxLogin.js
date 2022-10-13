const joi = require('@hapi/joi');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const axios = require('axios').default;
const controller = require('../../controller/users');
const config = require('../../config');
const { findOne, create } = require('../../db/users');

/* schema */
const schema = joi.object().keys({
   code: joi.string().required(),
});

/* handler */
async function handler(ctx) {
   const { code } = ctx.request.body;

   try {
      const response = await axios.get(`https://api.weixin.qq.com/sns/jscode2session?appid=${config.wx.AppID}&secret=${config.wx.AppSecret}&js_code=${code}&grant_type=authorization_code`);
      const { openid } = response.data;
      let user = await findOne({ openid });

      if (!user) {
         // * 新注册用户
         user = await create({
            openid,
            username: uuidv4(),
            createdAt: new Date(),
         });
      }
      user = user.toObject();
      const token = await controller.createToken(user);
      // * 放入token
      _.set(user, 'token', token);
      ctx.response.body = user;
   } catch (error) {
      console.log('error: ', error);
   }
}

module.exports = {
   method: 'post',
   url: '/user/wxLogin',
   schema,
   handler,
   isPublic: true,
};
