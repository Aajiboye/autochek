const log4js = require('log4js');
const config = require('../config');
// const SLACK_TOKEN = 'YOUR_SLACK_TOKEN HERE';
// const SLACK_CHANNEL = 'YOUR_CHANNEL';
// const SLACK_BOT_USERNAME = 'BOT_NAME';

class CendLogger {
  constructor(ServiceName) {
    this.logEngine = log4js;
    this.serviceName = ServiceName;
    const appenders = {};
    appenders[ServiceName] = { type: 'console' };
    const appendersList = [ServiceName];

    // Log only to staging or production
    if (config.isProduction()) {
      const awsconfig = {
        type: 'log4js-cloudwatch-appender',
        accessKeyId: config.LOGAWSACCESSKEY,
        secretAccessKey: config.LOGAWSSECRETACCESSKEY,
        region: 'us-east-2',
        logGroup: 'cord-api-log',
        logStream: this.serviceName,
        lawgsConfig: {
          showDebugLogs: true,
        },
      };

      appenders.awsconfig = awsconfig;
      appendersList.push('awsconfig');
    }
    this.logEngine.configure({
      appenders,
      categories: { default: { appenders: appendersList, level: 'all' } },
    });
  }

  static getInstance(ServiceName) {
    return new CendLogger(ServiceName);
  }

  getLogInstance() {
    return this.logEngine.getLogger(this.serviceName);
  }
}

module.exports = CendLogger;
