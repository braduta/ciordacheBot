#!/usr/bin/env node

'use strict';

var CiordacheBot = require('../lib/ciordachebot');

/**
 * Environment variables used to configure the bot:
 *
 *  BOT_API_KEY : the authentication token to allow the bot to connect to your slack organization. You can get your
 *      token at the following url: https://<yourorganization>.slack.com/services/new/bot (Mandatory)
 */

var token = process.env.BOT_API_KEY || require('../token');
var name = process.env.BOT_NAME;

var ciordachebot = new CiordacheBot({
    token: token,
    name: name
});

ciordachebot.run();
