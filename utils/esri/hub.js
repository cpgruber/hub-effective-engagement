/*
  this util hosts business logic as it relates to the demo hub initiative.
  if user params are included in the survey123 webhook payload, it can be used
  to do "hub" things. in this example, we check whether a survey respondent already
  follows our initiative, so we can send a specific follow up email
*/

require('isomorphic-fetch');
require('isomorphic-form-data');
const { isUserFollowing } = require('@esri/hub-initiatives');
const { UserSession } = require('@esri/arcgis-rest-auth');
const { getUserUrl } = require('@esri/arcgis-rest-portal');
const { request } = require('@esri/arcgis-rest-request');
const { INITIATIVE_ID, INITIATIVE_URL } = process.env;

const getAuth = authParams => {
  const authentication = new UserSession(authParams);
  return { authentication, params: { token: authParams. token } };
};

const getPage = (key = '') => {
  let pageName = '/';
  switch (key) {
    case 'chase_gruber':
    case 'brian_rollison':
    case 'keanu_reeves':
      pageName = `/pages/${key.split('_')[0]}`;
      break;
  }
  return `${INITIATIVE_URL}${pageName}`;
};

const doesUserFollowInitiative = async ro => {
  const user = await request(getUserUrl(ro.authentication), ro).catch(() => null);
  return user && isUserFollowing(user, INITIATIVE_ID);
};

module.exports = { getAuth, getPage, doesUserFollowInitiative };
