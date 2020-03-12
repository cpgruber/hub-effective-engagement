/*
  check if origin matches https://survey123<dev|qa>.arcgis.com
*/

module.exports = origin => !!(origin && /\bhttps:\/\/survey123(dev|qa)?.arcgis.com\b/.test(origin));
