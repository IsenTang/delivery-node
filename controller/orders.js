const _ = require('lodash');
const moment = require('moment');
const {
   create, find, findByPage, count,
} = require('../db/orders');
const { findOne: findRestaurant } = require('../db/restaurants');
const { findOne: findUser } = require('../db/users');
const Woops = require('../common/error');
const { canon } = require('../utils/utils');

/*
 * 下单
 */
async function placeOrder({ data }) {
   /* find user & restaurant first */
   const restaurant = await findRestaurant({
      _id: canon(data.restaurantId),
   });

   const user = await findUser({
      _id: canon(data.userId),
   });

   if (_.isEmpty(restaurant || _.isEmpty(user))) {
      throw new Woops('Wrong-with-place-order', 'Something wrong with place order.');
   }

   const order = {
      cart: data.cart,
      payment: data.payment,
      restaurant,
      user,
   };

   const result = await create(order);

   return result;
}

/* 查找个人订单 */
async function getOrder({ userId }) {
   const query = {
      'user._id': canon(userId),
   };

   const result = await find({ query });

   return result;
}

async function getOrderByQuery(data) {
   const { start, end } = data;

   const query = {

   };
   if (start && end) {
      query.createdAt = {
         $gt: moment(start).toDate(),
         $lt: moment(end).toDate(),
      };
   }

   const result = await find({ query });

   return result;
}

async function getOrderByPage({ userId, page, limit }) {
   const query = {
      'user._id': canon(userId),
   };

   const [
      list,
      total,
   ] = await Promise.all([
      findByPage(
         {
            query,
            skip: (page - 1) * limit,
            limit: Number(limit),
         },
      ),
      count({ query }),
   ]);

   return { list, total };
}

module.exports = {
   placeOrder,
   getOrder,
   getOrderByQuery,
   getOrderByPage,
};
