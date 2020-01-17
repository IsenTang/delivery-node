/* 自定义error */
class Woops extends Error {
   constructor(status, message, details) {
      super(message || 'Uncatch Error');

      this.name = this.constructor.name;
      // Capturing stack trace, excluding constructor call from it.
      Error.captureStackTrace(this, this.constructor);

      this.status = status || 500;
      this.details = details || {};
   }

   statusCode() {
      return this.status;
   }

   details() {
      return this.details;
   }
}

module.exports = Woops;
