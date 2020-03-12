/*
  this util creates a google analytics instance with a unique random client id.
  this instance is passed throughout the application to log events that can be tracked
  to an individual execution of the lambda
  https://www.npmjs.com/package/universal-analytics
*/

const { uuid } = require('uuidv4');
const ua = require('universal-analytics');
const { GA_KEY } = process.env;
const ec = 'Webhook Events';

const createClient = () => {
  const cid = uuid();
  const client = ua(GA_KEY, cid);

  const logEvent = (params) => {
    const event = Object.assign({}, params, { ec });
    console.log('LOG ANALYTICS', event);
    return client.event(event).send();
  };

  const getTrackingPixel = () => {
    const ea = 'Email Opened';
    const url = encodeURI(`https://www.google-analytics.com/collect?v=1&tid=${GA_KEY}&cid=${cid}&t=event&ec=${ec}&ea=${ea}`);
    return `<img src="${url}" style="height:1px;width:1px;opacity:0;" />`;
  };

  const getCampaignParams = () => {
    return encodeURI(`?utm_source=${ec}&utm_medium=Email&utm_campaign=DevSummit 2020`);
  };

  return { logEvent, getTrackingPixel, getCampaignParams };
};

module.exports = createClient;
