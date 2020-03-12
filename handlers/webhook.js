/*
  this handler proxies api POST requests made to the /webhook endpoint.
  it delegates to a util which determines whether the request originated from
  an accepted origin (survey123) and sends a response back to the request client
*/

const processEvent = require('../utils/api/process-event');

module.exports = (event, context, callback) => {
  const response = processEvent(event);
  return callback(null, response);
};
