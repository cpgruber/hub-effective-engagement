'use strict';

const env = require('./config/_env') || 'dev';
const envPath = `./config/env.${env}.json`;
if (!process.env._HANDLER) require('dotenv-json')({ path: envPath });

const webhook = require('./handlers/webhook');

module.exports.webhook = webhook;
