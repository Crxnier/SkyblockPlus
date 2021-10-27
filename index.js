const botconfig = require("./botconfig.json");
const tokenfile = require("./tokenfile.json")
const Discord = require("discord.js");
require('discord-reply');
const fs = require("fs");
const color = ((1 << 24) * Math.random() | 0).toString(16);
const bot = new Discord.Client({disableEveryone: true});
const client = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
// const ms = require("ms");
try{
  //Command handler
  fs.readdir("./commands/", (err, files) => {

    if(err) message.channel.send("An error has occured (`", err, "`) if this error keeps happening please contract the bot owner");

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldnt find commands")
      return;
    }

    jsfile.forEach((f, i) =>{
      let props = require(`./commands/${f}`)
      console.log(`${f} loaded!`);
      bot.commands.set(props.help.name, props);
    });
  });
  bot.on ("message", async message => {

    if(message.author.bot) return;
    // if(message.channel.type === "dm") return message.channel.send("Please use me in a public discord!");

    let prefix = botconfig.prefix;
    for (const thisPrefix of prefix) {
    if (message.content.toLowerCase().startsWith(thisPrefix)) prefix = thisPrefix;
  }
    let messageArray = message.content.toLowerCase().split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(!message.content.toLowerCase().startsWith(prefix))return;

    if(commandfile) commandfile.run(bot,message,args);
  });

//Activity
  bot.once("ready", async () => {
    console.log(`${bot.user.username} is online and in ${bot.guilds.cache.size} servers!`);
    bot.user.setActivity(`s!help`, {type: 1})
  });
}catch(e){
  console.log(e.stack)
}

bot.login(tokenfile.token);
