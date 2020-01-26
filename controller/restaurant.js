const { find } = require('../db/restaurants');
const { intersects } = require('../services/restaurant');

/* 获取周边饭店 */
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

module.exports = {
   getNearByRestaurant,
};
