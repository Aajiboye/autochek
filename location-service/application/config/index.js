/* eslint-disable global-require */
module.exports = {
  /**
   *  port
   */
  PORT: require('./port'),
  DATABASE: require('./database'),
  APP: require('./app'),
  /**
   * Credentials for the AWS Logs
   */

  isProduction() { // function to check if production is set
    return (process.env.NODE_ENV === 'production');
  },
  ROLES: ['ADMIN', 'USER'],
  LOCATION: [0.73453,1.023432]
};
