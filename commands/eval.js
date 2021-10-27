const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  try{
    if(message.author.id !== "157619634504204289") return message.channel.send("❌ Sorry only the bot owner can do this ❌");

    function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.send(clean(evaled), {code:"xl"});
    } catch (err) {
      throw err
    }

  } catch(e){
    console.log(e.stack)
    message.channel.send("Sorry! I ran into an error while executing the command.")
  }
}
module.exports.help = {
  name: "eval",
  description: "bot owner only",
  usage: "s!eval"
}
