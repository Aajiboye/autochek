/* eslint-disable no-param-reassign */
const http = require('got');

// eslint-disable-next-line no-unused-vars
const makerequest = async (method, url, body = {}, headers = {}) => {
  delete headers['content-length'];
  let reqObj = {
    method,
    json: body,
    responseType: 'json',
    retry: 0,
    headers,
  };

  if (method === 'POST' || method === 'PUT') {
    reqObj = {
      method,
      json: body,
      responseType: 'json',
      retry: 0,
      headers,
    };
  } else {
    reqObj = {
      method,
      responseType: 'json',
      retry: 0,
      headers,
    };
  }

  return http(url, reqObj);
};

module.exports = makerequest;
