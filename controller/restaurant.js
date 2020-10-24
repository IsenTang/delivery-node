const { find, findByPage } = require('../db/restaurants');
const { intersects } = require('../services/restaurant');

/* 获取周边饭店 */
async function getNearByRestaurant({ location, limit, skip }) {
   const intersectsLocation = await intersects(location);

   const query = {
      'delivery.zone.features.geometry': intersectsLocation,
      hours: { $exists: true },
      items: { $exists: true },
   };
   let result;
   if (limit && skip) {
      result = await findByPage({ query, limit, skip });
   } else {
      result = await find({ query });
   }

   return result;
}

module.exports = {
   getNearByRestaurant,
};
