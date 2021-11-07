const Discord = require("discord.js");
const bot = new Discord.Client

module.exports.run = async (bot, message, args) => {
try{
  let color = ((1 << 24) * Math.random() | 0).toString(16);

//Maths to get bot uptime
    let totalSeconds = (bot.uptime / 1000);
    let hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds / 60);
//Making the result
    let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;
//Embeding and sending message
    let uEmbed = new Discord.RichEmbed()
    .setColor(`#${color}`)
    .setDescription(`**${uptime}**`);
    message.channel.send(uEmbed);
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}
module.exports.help = {
  name: "uptime",
  description: "Shows how long the bot as been up (Bot must be up for atleast 30 seconds before working)",
  usage: "s!uptime"
}
