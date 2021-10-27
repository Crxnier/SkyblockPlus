const Discord = require("discord.js");
const client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MEMBERS', 'GUILD_BANS', 'GUILD_EMOJIS_AND_STICKERS', 'GUILD_INTEGRATIONS', 'GUILD_WEBHOOKS','GUILD_INVITES', 'GUILD_VOICE_STATES', 'GUILD_PRESENCES', 'GUILD_MESSAGES', 'GUILD_PRESENCES', 'GUILD_MESSAGE_REACTIONS', 'GUILD_MESSAGE_TYPING'], partials: ["MESSAGE", "CHANNEL", "REACTION"]})
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);
const { Client, Attachment, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
const request = require('request');
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    const channel = client.channels.cache.get(message.channel);
    console.log("hi")
    channel.send("t")
  }
    module.exports.help = {
      name: "fuck",
      description: "fuck",
      usage: "s!fuck"
    }
