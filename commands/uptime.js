const Discord = require("discord.js");
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);


module.exports.run = async (bot, message, args) => {
try{
  let totalSeconds = (bot.uptime / 1000);
  let days = Math.floor(totalSeconds / 86400);
  totalSeconds %= 86400;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = Math.floor(totalSeconds % 60);

  let uptime = `${hours} hours, ${minutes} minutes and ${seconds} seconds`;

  const uptimeEmbed = new Discord.MessageEmbed()
  .setColor(randomColor)
  .setDescription(`**${uptime}**`);
  message.channel.send(uptimeEmbed);
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
