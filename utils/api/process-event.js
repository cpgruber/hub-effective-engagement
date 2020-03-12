/*
  this util parses POST requests made to /webhook. it creates a unique google
  analytics client for the supplied tracking id, which is used throughout the
  execution of the lambda. it validates the origin of the request and sends a
  success or error response back to the client. if the request was made by a
  whitelisted origin (survey123), it invokes the scripts that send follow up
  emails and logs enriched google analytics events
*/

const createAnalyticsClient = require('../analytics');
const validateOrigin = require('./validate-origin');
const { success, error } = require('./responses');
const engageUser = require('../esri/engage-user');

const parse = ({ headers, body } = {}) => {
  const analytics = createAnalyticsClient();

  let response, ea;
  if (headers.origin && validateOrigin(headers.origin)) {
    response = success(headers.origin);
    ea = 'Survey Processed';
    engageUser(analytics, JSON.parse(body));
  } else {
    response = error();
    ea = 'Survey Rejected';
  }

  analytics.logEvent({ ea });
  return response;
};

module.exports = parse;
