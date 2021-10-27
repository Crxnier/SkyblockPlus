const Discord = require("discord.js");
const fs = require("fs");
const request = require('request');


module.exports.run = async (bot, message, args) => {

    var filePath = `C:/Users/ Super/Downloads/SkyblockPlusBot/uuid/${message.author.id}.json`
    const prefix = "s!link";
    const name = message.content.substring(prefix.length).split(" ")

    const errorMessage = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Invalid username or API is down!**")
    .setDescription("if this issue persists, join the support discord.")
    .setFooter("If you notice any issues please do 's!support' and join the server for help")

    var profileID = "";
    var arrayPos = "";
    var uuid = "";
    var hypixel = "";
    var profileList = "";
    var profileIDArray = "";

    var apiPath = `C:/Users/Super/Downloads/SkyblockPlusBot/HypixelAPI.json`
    fs.access(apiPath, fs.F_OK, (err) => {
        if (err) {
            if (err) throw err;
        }
        else {
            hypAPI = JSON.parse(fs.readFileSync(apiPath, 'utf8'));
        }
    })

    if(name[1]){
        username = name[1]
    }
    else {
        const filter = m => m.author.id === message.author.id;
        message.reply("What's your Minecraft username?")
            await message.channel.awaitMessages(filter, {
                max: 1, 
                time: 15000
            }).then(collected => {
                if(collected.first() == null){
                    return message.reply("Cancelled due to no reply in 15 seconds");
                }
                else if(collected.first().content.toLowerCase() === "cancel"){
                    return message.reply("Cancelled")
                }
                else {
                    username = collected.first()
                    url = `https://api.mojang.com/users/profiles/minecraft/${username}`
                    request(url, function (error, response, body) {
                    console.log('Mojang statusCode:', response && response.statusCode);
                    statusCode = response && response.statusCode
                    if(statusCode > 201){
                        return message.channel.send(errorMessage);
                    }
                    else{
                        uuid = JSON.parse(body)
                        hypUrl = `https://api.hypixel.net/skyblock/profiles?key=${hypAPI.API}&uuid=${uuid.id}`
                        request(hypUrl, function (error, response, body) {
                            console.log('Hypixel statusCode:', response && response.statusCode);
                            statusCode = response && response.statusCode
                            if(statusCode == 400){
                                return message.channel.send(errorMessage);
                            }
                            else if(statusCode == 403){
                                message.channel.send("Bot is using an invalid API key, please do `s!support` and report this!")
                                return;
                            }
                            else if(statusCode == 429){
                                message.channel.send("Request limit has been reached! Please try again in 30 seconds")
                                return;
                            }
                            else{
                                //loadJSON(`https://api.hypixel.net/skyblock/profile?key=${hypAPI}&name=${name}`)#
                                hypixel = JSON.parse(body)
                                profileList = [];
                                array = hypixel.profiles
                                for(let i = 0; i < array.length; i++){
                                    profileList.push(array[i]['cute_name'].toLowerCase())
                                    profileIDArray = array[i]['profile_id']
                                }
                                const profileListQuestion = new Discord.MessageEmbed()
                                .setColor('RANDOM')
                                .setThumbnail(message.author.avatarURL())
                                .setTitle("**Choose what profile you are using**")
                                .setDescription(`${profileList}\nTo choose a profile, put the name in chat`)
                                .setFooter("If you notice any issues please do 's!support' and join the server for help")
                                message.channel.send(profileListQuestion)
                                
                            }
            
                    })

                    }
                    })
                }
            })

            await message.channel.awaitMessages(filter, {
                max: 1,
                time: 15000
            }).then(collected => {
                profileInput = collected.first()
                array = hypixel.profiles
                if(profileInput.content.toLowerCase() == profileList[0]){
                    profileID = array[0]['profile_id']
                    arrayPos = 0
                }
                else if(profileInput.content.toLowerCase() == profileList[1]){
                    profileID = array[1]['profile_id']
                    arrayPos = 1

                }
                else if(profileInput.content.toLowerCase() == profileList[2]){
                    profileID = array[2]['profile_id']
                    arrayPos = 2
                }
                else if(profileInput.content.toLowerCase() == profileList[3]){
                    profileID = array[3]['profile_id']
                    arrayPos = 3
                }
                else if(profileInput.content.toLowerCase() == profileList[4]){
                    profileID = array[4]['profile_id']
                    arrayPos = 4
                }
                else{
                    const invalidProfile = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(message.author.avatarURL())
                    .setTitle("**Error**")
                    .setDescription(`Invalid profile name given`)
                    .setFooter("If you notice any issues please do 's!support' and join the server for help")
                    return message.channel.send(invalidProfile)
                }

                var filePath = `C:/Users/Super/Downloads/SkyblockPlusBot/playerinfo/${message.author.id}.json`
                var fileContent = `{\n"UUID":"${uuid.id}",\n"PROFILE_ID": "${profileID}",\n"USERNAME": "${username}",\n"ARRAYPOS": "${arrayPos}"\n}`

                const link = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setThumbnail(message.author.avatarURL())
                    .setTitle("**You are now linked!**")
                    .setDescription("You can now use more features like 'next level' in CataCalc")
                    .setFooter("If you notice any issues please do 's!support' and join the server for help");

                fs.access(filePath, (err) => {
                    if (!err) {
                        fs.unlinkSync(`C:/Users/Super/Downloads/SkyblockPlusBot/playerinfo/${message.author.id}.json`, function (err) {
                            if (err) throw err;
                            // if no error, file has been deleted successfully
                        });

                        fs.writeFile(filePath, fileContent, (err) => {
                            if (err) throw err;
            
                            message.channel.send(link)
                        })
                    }

                    else {
                        fs.writeFile(filePath, fileContent, (err) => {
                            if (err) throw err;
            
                            message.channel.send(link)
                        })
                  }
                })
            })
        }

  }
    module.exports.help = {
      name: "link",
      description: "Link your Skyblock account to the bot",
      usage: "s!link"
    }