/* eslint-disable global-require */
// the general exports
module.exports = {
  PORT: require('./port'), // get the port
  ENVIRONMENT: process.env.NODE_ENV, // set the production
  CORRELATIONID_PREFIX: 'CORDAPI',
  isProduction() { // function to check if production is set
    return (process.env.NODE_ENV === 'production');
  },
  /**
   * ACCESS CREDNENTIAL FOR SERVICES
   */
  LOCSERVICETOKEN: process.env.LOCSRVTOKEN,

};
