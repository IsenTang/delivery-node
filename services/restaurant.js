const _ = require('lodash');
const Woops = require('../common/error');

/*
 * get near query
 * https://mongoosejs.com/docs/api.html#query_Query-near
 */
async function intersects(location) {
   let data = [];

   /* 获取地址信息 */
   if (_.isString(location)) {
      data = _.map(location.split(','), Number);
   } else {
      throw new Woops('Location is malformed', 'Location is malformed');
   }

   /* near config  */
   return {
      $geoIntersects: {
         $geometry: {
            type: 'Point',
            coordinates: data,
         },
      },
   };
}

module.exports = {
   intersects,
};
