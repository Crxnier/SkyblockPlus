const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);
const { Client, Attachment, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');

module.exports.run = async (bot, message, args) => {
  let supportEmbed = new Discord.MessageEmbed()
  .setColor('RANDOM')
  .setThumbnail(message.author.avatarURL())
  .setTitle("**Support discord**")
  .setDescription("You can join the support discord by clicking **[this](https://shorturl.at/fquRZ)**!");
  
  message.channel.send(supportEmbed)

  }
    module.exports.help = {
      name: "support",
      description: "seek help.",
      usage: "s!support"
    }
