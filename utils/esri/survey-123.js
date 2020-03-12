/*
  this util parses the request payload from survey123 and formats it for convenience
  of the hub engagement scripts. the business logic here is hardcoded to the demo survey,
  but could easily be configured to accommodate other use cases
*/

const formatPortalUrl = url => {
  if (!url.endsWith('/sharing/rest')) {
    url = `${url}/sharing/rest`;
  }
  return url;
};

const parseSurveyResponse = ({ userInfo, portalInfo, feature: { attributes } }) => {
  const info = {
    existingUser: false
  };

  if (attributes) {
    const {
      what_is_your_full_name: fullName,
      what_is_your_email_address: email,
      who_is_your_favorite_person: favorite
    } = attributes;
    info.emailParams = { fullName, email, favorite };
  }

  if (userInfo && portalInfo) {
    const { username, fullName, email } = userInfo;
    const { token, url } = portalInfo;
    const portal = formatPortalUrl(url);
    info.existingUser = true;
    info.emailParams.fullName = fullName;
    info.emailParams.email = email;
    info.authParams = { username, token, portal };
  }

  return info;
};

module.exports = parseSurveyResponse;
