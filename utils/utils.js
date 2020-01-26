const _ = require('lodash');
const Moment = require('moment-timezone');
const ShortId = require('shortid');
const ObjectId = require('bson-objectid');

/**
 * Regex pattern for valid IDs
 */
const pattern = /^([a-zA-Z0-9]+)_([a-zA-Z0-9$@_-]+)$/;

/**
 * ID canonicalization
 */
function canon(v) {
   /* When v is falsy, return null */
   if (!v) { return null; }

   /* If this is a BSON ObjectId, deserialize it */
   if (ObjectId.isValid(v)) { return ObjectId(v); }

   /* Check if this is a valid string ID */
   const match = pattern.exec(v);

   /* if not valid, throw error */
   if (!match || !ShortId.isValid(match[2])) {
      throw new Error('Attempting to convert an invalid ID');
   }

   return v;
}

/**
 * Checks whether an entity with hours is available
 */
function isOpen({ ent, type = null, tz = 'America/New_York' }) {
   /* Restaurant: closed */
   if (!_.isEmpty(ent.closed)) { return false; }

   /* Get current server time in the specified timezone */
   const t = Moment().tz(tz);
   const m = (t.hour() * 60) + t.minute();
   const d = t.day();

   /* Find matching intervals */
   return !!_.find(ent.hours, (i) => (

      /* check opening time and type */
      i.start <= m && m <= i.end && (!type || type === i.type) && d === i.dayOfWeek
   ));
}

module.exports = {
   canon,
   isOpen,
};
