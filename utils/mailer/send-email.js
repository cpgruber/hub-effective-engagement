/*
  this util sends mail using mailgun api, and logs analytics for success or failure
  https://www.npmjs.com/package/mailgun-js
*/

const mg = require('mailgun-js');
const { MG_KEY, MG_DOMAIN, MG_SENDER } = process.env;
const mailer = mg({ apiKey: MG_KEY, domain: MG_DOMAIN });

// converts `thisisastring` to `this********`;
const anonymize = str => str.slice(0, 4) + str.slice(4).replace(/./g, '*');

const send = (analytics, { recipient, subject, template: html } = {}) => {
  const params = {
    to: recipient,
    from: MG_SENDER,
    subject,
    html
  };

  console.log('EMAIL PARAMS', Object.assign({}, params, { to: anonymize(params.to) }));
  return mailer.messages().send(params).then(() => {
    const ea = 'Email Sent';
    analytics.logEvent({ ea });
  }).catch(() => {
    const ea = 'Email Failed';
    analytics.logEvent({ ea });
  });
};

module.exports = send;
