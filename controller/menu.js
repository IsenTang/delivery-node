const _ = require('lodash');
const { find: menuFind } = require('../db/menu');
const { find: categoryFind } = require('../db/category');
const { find: restaurantFind } = require('../db/restaurants');
const { canon, isOpen } = require('../utils/utils');

/* 获取菜单和类别信息 */
async function getMenu({ restaurantId }) {
   const query = {
      'restaurant._id': canon(restaurantId),
   };

   /* 菜单，类别，餐馆信息 */
   const [
      food,
      categories,
      rest,
   ] = await Promise.all([
      menuFind({ query }),
      categoryFind({ query }),
      restaurantFind({ query: { _id: canon(restaurantId) } }),
   ]);

   /* 整合 */
   /* 食物是否在时间内可用 */
   // eslint-disable-next-line no-restricted-syntax
   for (const f of food) {
      /* Availability */
      // eslint-disable-next-line no-await-in-loop
      const isAvailable = isOpen({ ent: f, tz: rest.timezone });

      /* Assign availability to food object */
      if (f.hours && !isAvailable) {
         f.available = false;
      }
   }

   /* 重新根据属性排列食物 */
   const sortedFood = _.orderBy(
      food,
      [ 'available', 'zscore', 'index' ],
      [ 'desc', 'desc', 'asc' ],
   );

   return { categories, foods: sortedFood };
}

module.exports = {
   getMenu,
};
