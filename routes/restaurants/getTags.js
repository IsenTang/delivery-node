const tags = [ 'noodle',
   'dim_sum',
   'cafe',
   'shanghai',
   'sichuan',
   'bbq',
   'taiwanese',
   'bento',
   'dessert',
   'seafood',
   'hongkong_cafe',
   'sushi',
   'mala_soup',
   'crepe',
   'hotpot',
   'home_a',
   'ramen',
   'home',
   'seafood_a',
   'casserole_rice',
   'vietnamese',
   'snack' ];

const joi = require('@hapi/joi');

/* schema */
const schema = joi.object().keys({});

/* handler */
async function handler(ctx) {
   ctx.response.body = tags;
}

module.exports = {
   method: 'get',
   url: '/tags',
   schema,
   handler,
   isPublic: true,
};

