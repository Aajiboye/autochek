/* eslint-disable no-param-reassign */
const httprequest = require('../utils/webrequest');
const httpmethod = require('../utils/httpmethod');
const URLS = require('../config/webconfig/adminserviceconfig');

const config = require('../config');

const setupbase = async (requestData, header, url, method) => {
  header['x-api-key'] = config.LOCSERVICETOKEN;
  return httprequest(httpmethod[method], url, requestData, header);
};

// ADMIN Service

const setRefLoc = async (requestData, header) => setupbase(
  requestData, header, URLS.BASE + URLS.SETREFLOC, 'POST',
);

module.exports = {
  setRefLoc,
};
