const Woops = require('../common/error');
const {
   find, update, findByPage, count, findOne,
} = require('../db/restaurants');
const { intersects } = require('../services/restaurant');
const { canon } = require('../utils/utils');

/* 获取所有周边饭店 */
async function getNearByRestaurant({ location }) {
   const intersectsLocation = await intersects(location);

   const query = {
      'delivery.zone.features.geometry': intersectsLocation,
      hours: { $exists: true },
      items: { $exists: true },
   };

   const result = await find({ query });

   return result;
}

/* 获取单个餐馆信息 */
async function getRestaurantInfo({ id }) {
   const query = {
      _id: canon(id),
   };

   const result = await findOne({ query });

   return result;
}

/* 更新餐馆 */
async function updateRestaurant({ id, data }) {
   try {
      const result = await update({
         query: {
            _id: canon(id),
         },
         updated: { ...data },
      });

      return result;
   } catch (error) {
      throw new Woops('Wrong-with-update', 'Something wrong with update restaurant.');
   }
}

/* 分页获取餐馆 */
async function getNearByRestaurantByPage({ location, limit, page }) {
   const intersectsLocation = await intersects(location);

   const query = {
      'delivery.zone.features.geometry': intersectsLocation,
      hours: { $exists: true },
      items: { $exists: true },
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
   getNearByRestaurant,
   updateRestaurant,
   getNearByRestaurantByPage,
   getRestaurantInfo,
};
