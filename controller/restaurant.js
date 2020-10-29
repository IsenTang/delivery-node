const Woops = require('../common/error');
const { find, update } = require('../db/restaurants');
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

/* 获取周边饭店 */
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

module.exports = {
   getNearByRestaurant,
   updateRestaurant,
};
