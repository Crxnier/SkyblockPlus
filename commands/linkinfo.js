const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);
const { Client, Attachment, Message, MessageEmbed } = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    var path = `C:/Users/Super/Downloads/SkyblockPlusBot/playerinfo/${message.author.id}.json`

    fs.access(path, (err) => {
        if (err) {
                message.channel.send("You have not linked.")
        }

        else {
            var user = JSON.parse(fs.readFileSync(path, 'utf8'));
            let userInfoEmbed = new Discord.MessageEmbed()
            .setColor(randomColor)
            .setThumbnail(message.author.avatarURL())
            .setTitle("**Player information**")
            //.setDescription(`UUID: ${user.UUID}\nPROFILE_ID: ${user.PROFILE_ID}\nUSERNAME: ${user.USERNAME}\nARRAYPOS: ${user.ARRAYPOS}`)
            .setDescription(`**Username** ${user.USERNAME}\n**UUID** ${user.UUID}\n**Profile ID** ${user.PROFILE_ID}\n**Array position** ${user.ARRAYPOS}\n**Dungeon info** s!dungeon`)
            .setFooter("If you notice any issues please do 's!support' and join the server for help");

            message.channel.send(userInfoEmbed)
        }
    })
  }
    module.exports.help = {
      name: "linkinfo",
      description: "Shows all the information the bot stores about you",
      usage: "s!linkinfo"
    }
