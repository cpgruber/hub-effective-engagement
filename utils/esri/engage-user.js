/*
  this util coordinates user engagement depending on the contents of survey123
  webhook payload. it formats survey responses for templating emails, and determines
  whether a logged in user completed the survey. if an authenticated user did respond,
  it checks whether they follow the demo initiative. the follow-up email template
  sent to the user depends on whether their authentication and their existing
  engagement with the initiative. all emails include a tracking pixel and a link
  with campaign parameters, so email opens and link clicks can be tracked in
  google analytics. finally it invokes mailgun to send the email
*/

const parseSurveyResponse = require('./survey-123');
const { getAuth, getPage, doesUserFollowInitiative } = require('./hub');
const getEmailTemplate = require('../mailer/get-email-template');
const sendEmail = require('../mailer/send-email');

const engageUser = async (analytics, payload) => {
  const { existingUser, emailParams, authParams } = parseSurveyResponse(payload);
  emailParams.pixel = analytics.getTrackingPixel();
  const showPage = getPage(emailParams.favorite);
  const campaignParams = analytics.getCampaignParams();
  emailParams.followUpLink = `${showPage}${campaignParams}`;

  let templateType = 'anonymous';
  if (existingUser) {
    const authMgr = getAuth(authParams);
    const userFollowsInitiative = await doesUserFollowInitiative(authMgr);
    templateType = userFollowsInitiative ? 'follower' : 'user';
  }

  const emailTemplate = getEmailTemplate(templateType, emailParams);
  // no spam
  if (templateType !== 'anonymous') {
    return sendEmail(analytics, emailTemplate);
  }
};

module.exports = engageUser;
