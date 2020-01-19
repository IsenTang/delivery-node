const { findNearBy } = require('../db/restaurants');
const { near } = require('../services/restaurant');

/* 获取周边饭店 */
async function getNearByRestaurant({ location }) {
   const data = await near(location);

   const result = await findNearBy(data);

   return result;
}

module.exports = {
   getNearByRestaurant,
};
