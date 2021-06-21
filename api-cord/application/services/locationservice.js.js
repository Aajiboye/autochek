/* eslint-disable no-param-reassign */
const httprequest = require('../utils/webrequest');
const httpmethod = require('../utils/httpmethod');
const URLS = require('../config/webconfig/locationserviceconfig');

const config = require('../config');

const setupbase = async (requestData, header, url, method) => {
  header['x-api-key'] = config.LOCSERVICETOKEN;
  return httprequest(httpmethod[method], url, requestData, header);
};

// PRODUCT Service

const add = async (requestData, header) => setupbase(
  requestData, header, URLS.BASE + URLS.ADDLOCATION, 'POST',
);

const update = async (requestData, param, header) => setupbase(
  requestData, header, `${URLS.BASE + URLS.UPDATELOCATION + param}`, 'PUT',
);
const softDelete = async (requestData, param, header) => setupbase(
  requestData, header, `${URLS.BASE + URLS.SOFTDELETE + param}`, 'DELETE',
);

const hardDelete = async (requestData, param, header) => setupbase(
  requestData, header, `${URLS.BASE + URLS.HARDDELETE + param}`, 'DELETE',
);

const all = async (requestData, header) => setupbase(
  requestData, header, URLS.BASE + URLS.ALLLOCATIONS, 'GET',
);
const single = async (requestData, param, header) => setupbase(
  requestData, header, `${URLS.BASE + URLS.GETLOCATION + param}`, 'GET',
);
const calcDist = async (requestData, param, header) => setupbase(
  requestData, header, `${URLS.BASE + URLS.GETDISTANCE + param}`, 'GET',
);

module.exports = {
  add,
  update,
  softDelete,
  hardDelete,
  all,
  single,
  calcDist,
};
