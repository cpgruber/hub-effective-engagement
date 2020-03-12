/*
  generate various email templates with provided params
*/

const formatName = name => {
  const firstName = name.split('_')[0];
  return firstName.charAt(0).toUpperCase() + firstName.slice(1);
};

const anonymous = (fullName, favorite, followUpLink) => {
  return {
    subject: `Hi there! ${favorite} is our favorite too.`,
    template: `
      <p>Dear ${fullName},</p>
      <p>Thank you for participating in our little experiment, and also for picking ${favorite}.</p>
      <p>You can <a href="${followUpLink}">learn more about ${favorite} here</a>.</p>
      <p>If you want to stay in the know, we invite you to sign up and follow our initiative.</p>
      <p></p>
      <p>Rock on!</p>
      <p>Chase + Brian</p>
    `
  };
};

const user = (fullName, favorite, followUpLink) => {
  return {
    subject: `Hey! ${favorite} is our favorite too.`,
    template: `
      <p>Dear ${fullName},</p>
      <p>Thank you for participating in our little experiment, and also for picking ${favorite}.</p>
      <p>You can <a href="${followUpLink}">learn more about ${favorite} here</a>.</p>
      <p>Keep up to date by following our initiative!</p>
      <p></p>
      <p>Rock on!</p>
      <p>Chase + Brian</p>
    `
  };
};

const follower = (fullName, favorite, followUpLink) => {
  return {
    subject: `Hello friend! ${favorite} is our favorite too.`,
    template: `
      <p>Dear ${fullName},</p>
      <p>Your rock! We see that you already care about our initiative and wanted to thank you for your continued support.</p>
      <p>Thank you for participating in our little experiment, and also for picking ${favorite}.</p>
      <p>You can <a href="${followUpLink}">learn more about ${favorite} here</a>.</p>
      <p></p>
      <p>Rock on!</p>
      <p>Chase + Brian</p>
    `
  };
};

const getEmailTemplate = (type, { email: recipient, fullName, favorite, followUpLink, pixel }) => {
  const fav = formatName(favorite);
  const templateArgs = [fullName, fav, followUpLink];
  let msg;
  switch (type) {
    case 'follower':
      msg = follower(...templateArgs);
      break;
    case 'user':
      msg = user(...templateArgs);
      break;
    default:
      msg = anonymous(...templateArgs);
      break;
  }
  msg.template += pixel; // add tracking pixel to end of email body
  msg.recipient = recipient;
  return msg;
};

module.exports = getEmailTemplate;
