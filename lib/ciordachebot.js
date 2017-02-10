'use strict';

var util = require('util');
var Bot = require('slackbots');

/**
 * Constructor function. It accepts a settings object which should contain the following key:
 *      token : the API token of the bot (mandatory)
 * @param {object} settings
 * @constructor
 *
 */
var CiordacheBot = function Constructor(settings) {
    this.settings = settings;
    this.settings.name = this.settings.name || 'ciordache';
};

// inherits methods and properties from the Bot constructor
util.inherits(CiordacheBot, Bot);

/**
 * Run the bot
 * @public
 */
CiordacheBot.prototype.run = function() {
    CiordacheBot.super_.call(this, this.settings);

    this.on('start', this._onStart);
    this.on('message', this._onMessage);
};

/**
 * On Start callback, called when the bot connects to the Slack server and access the channel
 * @private
 */
CiordacheBot.prototype._onStart = function() {
    this._loadBotUser();
};

/**
 * Loads the user object representing the bot
 * @private
 */
CiordacheBot.prototype._loadBotUser = function() {
    var self = this;
    this.user = this.users.filter(function(user) {
        return user.name === self.name;
    })[0];
};

/**
 * On message callback, called when a message (of any type) is detected with the real time messaging API
 * @param {object} message
 * @private
 */
CiordacheBot.prototype._onMessage = function(message) {

    if (this._isChatMessage(message) && this._isChannelConversation(message) && !this._isFromCiordacheBot(message) && this._isMentioningAQuestion(message)) {
        this._smacksYou(message);
    }
};

/**
 * Replyes to a message with #altaintrebare
 * @param {object} originalMessage
 * @private
 */
CiordacheBot.prototype._smacksYou = function(originalMessage) {
    var self = this;
    var channel = self._getChannelById(originalMessage.channel);
    self.postMessageToChannel(channel.name, "Alta Intrebare!", {as_user: true});

};

/**
 * Sends a welcome message in the channel
 * @private
 */
CiordacheBot.prototype._welcomeMessage = function() {
    this.postMessageToChannel(this.channels[0].name, 'Hei, aici nu e dezbatere publica!' + '\n Am finalizat dezbaterea publica CARE am avut-o! \n Vrei sa vorbesti cu mine scrie-mi numele! ', {as_user: true});
};

/**
 * Util function to check if a given real time message object represents a chat message
 * @param {object} message
 * @returns {boolean}
 * @private
 */
CiordacheBot.prototype._isChatMessage = function(message) {
    return message.type === 'message' && Boolean(message.text);
};

/**
 * Util function to check if a given real time message object is directed to a channel
 * @param {object} message
 * @returns {boolean}
 * @private
 */
CiordacheBot.prototype._isChannelConversation = function(message) {
    return typeof message.channel === 'string';
};

/**
 * Util function to check if a given real time message is mentioning question or the CiordacheBot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
CiordacheBot.prototype._isMentioningAQuestion = function(message) {
    return message.text.toLowerCase().indexOf('?') > -1 || message.text.toLowerCase().indexOf(this.name) > -1;
};

/**
 * Util function to check if a given real time message has ben sent by the CiordacheBot
 * @param {object} message
 * @returns {boolean}
 * @private
 */
CiordacheBot.prototype._isFromCiordacheBot = function(message) {
    return message.user === this.user.id;
};

/**
 * Util function to get the name of a channel given its id
 * @param {string} channelId
 * @returns {Object}
 * @private
 */
CiordacheBot.prototype._getChannelById = function(channelId) {
    return this.channels.filter(function(item) {
        return item.id === channelId;
    })[0];
};

module.exports = CiordacheBot;
