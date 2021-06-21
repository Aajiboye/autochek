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
  /**
   * Credentials for the AWS Logs
   */
  AWSSERCRETACCESSKEY: process.env.AWS_SECRET_ACCESS_KEY, // access key from log role
  AWSSERCRETKEYID: process.env.AWS_ACCESS_KEY_ID, // secret key from log role
  /**
   * The list of URLS for the user services
   */
  DATABASE: require('./database'),
  ROLES: ['SUPERADMIN', 'ADMIN', 'CS', 'USER', 'PANEL'],

};
