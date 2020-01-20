const { find } = require('../db/restaurants');
const { near } = require('../services/restaurant');

/* 获取周边饭店 */
async function getNearByRestaurant({ location }) {
   const nearByLocation = await near(location);

   const query = {
      location: nearByLocation,
   };

   const result = await (await find({ query }));

   return result;
}

module.exports = {
   getNearByRestaurant,
};
