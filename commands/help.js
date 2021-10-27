const Discord = require("discord.js");
const client = new Discord.Client();
const bot = new Discord.Client();
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);

module.exports.run = async (bot, message, args) => {
try{
//Making help command if no subcommand is found
  if(!args[0]){
    botname = client.users.cache.get("868840669240774687")
    const h2Embed = new Discord.MessageEmbed()
    .setColor(randomColor)
    //.setTitle(botname)
    //.setThumbnail(name.avatarURL)
    .addFields(
      {name: "** 🚨 Important 🚨**", value: "link"},
      {name: "**Calculators 🤓**", value: "slayercalc, catacalc"},
      {name: "**Information 📄**", value: "support, linkinfo, help"}
      
    )
    .setFooter("To see more information about a command do `s!help <command name>` e.g. `s!help link`");
    message.channel.send(h2Embed)
  }
//Making the help GUI for all commands
  if(args[0]){
    let command = args[0];
    if(!bot.commands.get(command)) {
      message.channel.send("Command does not exist")
    }
    if(bot.commands.has(command)) {
      command = bot.commands.get(command);
      const hEmbed = new Discord.MessageEmbed()
      .setColor(randomColor)
      .setThumbnail(bot.user.displayAvatarURL)
      .addField(`Command`, `${command.help.name}`)
      .addField(`Description`, `${command.help.description}`)
      .addField(`Usage`, `${command.help.usage}`)
      .setFooter("If there is any issues with a command please report by doing s!support")
      message.channel.send(hEmbed)
    }
  }
}catch(e){
  console.log(e.stack)
  message.channel.send("Sorry! I ran into an error while executing the command.")
}
}
  module.exports.help = {
    name: "help",
    description: "Show the bot commands and how to use it and what it does",
    usage: "s!help or s!help <command name>"
}
