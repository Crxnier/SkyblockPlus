const Discord = require("discord.js");
require('discord-reply');
const bot = new Discord.Client({disableEveryone: true});
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);
const { Client, Attachment, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
const { removeAllListeners } = require("nodemon");
const fs = require('fs')
const request = require('request');

module.exports.run = async (bot, message, args) => {


    const xpNeededEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Catacombs XP Calculator**")
    .setDescription("you have 15 seconds to reply to all message or else the operation will be cancelled, you can use , & abbreviations e.g. 30,000 or 30k\n\nHow much XP do you need?")
    .setFooter("If you notice any issues please do 's!support' and join the server for help")

    const xpPerRunEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Catacombs XP Calculator**")
    .setDescription("How much XP per run?")
    .setFooter("If you notice any issues please do 's!support' and join the server for help")

    const timePerRunEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Catacombs XP Calculator**")
    .setDescription("How long does each run take? (In seconds)")
    .setFooter("If you notice any issues please do 's!support' and join the server for help")

    const cancelEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Catacombs XP Calculator**")
    .setDescription("Cancelled")
    .setFooter("If you notice any issues please do 's!support' and join the server for help")

    const derpyQuestionEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Catacombs XP Calculator**")
    .setDescription("Would you like Derpy mayor buffs to be included? yes/no")
    .setFooter("If you notice any issues please do 's!support' and join the server for help")

    path = `C:/Users/Super/Downloads/SkyblockPlusBot/playerinfo/${message.author.id}.json`
    fs.access(path, fs.F_OK, (err) => {
        if (err) {
          message.channel.send("You haven't linked your account! Do s!link for more information")
        }
        else {
            var user = JSON.parse(fs.readFileSync(path, 'utf8'));
        }
      })
    const filter = m => m.author.id === message.author.id;
    var xpNeededCancel = 0
    var derpyCancel = 0
    var timeCancel = 0
    var derpyCancel = 0
    msg = await message.lineReply(xpNeededEmbed)
    await message.channel.awaitMessages(filter, {
        max: 1, 
        time: 15000
    }).then(collected => {
        if(collected.first() == null){
            xpNeededCancel = 2
            message.channel.messages.fetch({limit: 2}).then(messages => {
                message.channel.bulkDelete(messages)
            })
        }
        else if(collected.first().content.toLowerCase() === "cancel"){
            xpNeededCancel = 2
        }

        xpNeeded = collected.first()
        if(xpNeeded.content.toLowerCase().includes("k")){
            xpNeededRemove = xpNeeded.content.replace(/k/,"")
            xpNeededMath = xpNeededRemove * 1000
            xpNeeded = Math.round(xpNeededMath)

        }
        else if(xpNeeded.content.toLowerCase().includes("m")){
            xpNeededRemove = xpNeeded.content.replace(/m/,"")
            xpNeededMath = xpNeededRemove * 1000000
            xpNeeded = Math.round(xpNeededMath)
        }
        else if(xpNeeded.content.toLowerCase().includes("next level")){
            var path = `C:/Users/Super/Downloads/SkyblockPlusBot/playerinfo/${message.author.id}.json`
            fs.access(path, (err) => {
                if (err) {
                        message.channel.send("You have not linked, please link by doing **s!link**")
                        return;
                }
                else {
                    var user = JSON.parse(fs.readFileSync(path, 'utf8'));
                    //user.UUID & user.PROFILE_ID
                    var apiPath = `C:/Users/Super/Downloads/SkyblockPlusBot/HypixelAPI.json`
                    fs.access(apiPath, fs.F_OK, (err) => {
                        if (err) {
                            if (err) throw err;
                        }
                        else {
                            hypAPI = JSON.parse(fs.readFileSync(apiPath, 'utf8'));

                            url = `https://api.hypixel.net/skyblock/profiles?key=${hypAPI.API}&uuid=${user.UUID}`
                            request(url, function (error, response, body) {
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
                                    hypixel = JSON.parse(body)

                                    catacombsXp = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['experience']


                                    cataXp= parseInt(catacombsXp)

                                    var path = `C:/Users/Super/Downloads/SkyblockPlusBot/catacombs/cataxp.json`
                                    var table = JSON.parse(fs.readFileSync(path, 'utf8'));

                                    
                                    for (let i = 1; i < 51; i++){
                                        //console.log(i)
                                        //console.log(table['levels'][i.toString()])
                                        if(table['levels'][i.toString()] > cataXp){
                                            console.log(`level is ${i}`)
                                            nextLevel = i;
                                            break
                                        }
                                    }
                                    nextLevelXp = table['levels'][`${nextLevel}`]

                                    xpNeeded = nextLevelXp - cataXp

                                }
                            })
                        }
                    })
                }
            })
        }
        else {
            xpNeeded = collected.first().content.replace(/,/, "")
        }
    }).catch(err => {
        console.log(err)
    })

    await message.channel.messages.fetch({limit: 1}).then(messages => {
        message.channel.bulkDelete(messages)
    })

    if(xpNeededCancel < 1){
        msg.edit(xpPerRunEmbed)
        await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 15000
        }).then(collected => {
            if(collected.first() == null){
                timeCancel = 3
                return message.reply("Cancelled due to no reply in 15 seconds").then(msg => {msg.delete({timeout: 5000})});
            }
            else if(collected.first().content.toLowerCase() === "cancel"){
                timeCancel = 3
                msg.edit(cancelEmbed)
                return;
            }
            xpGain = collected.first()
        if(xpGain.content.toLowerCase().includes("k")){
            xpGainRemove = xpGain.content.replace(/k/,"")
            xpGainMath = xpGainRemove * 1000
            xpGain = Math.round(xpGainMath)
        }
        else if(xpGain.content.includes("m")){
            xpGainRemove = xpGain.content.replace(/m/,"")
            xpGainMath = xpGainRemove * 1000000
            xpGain = Math.round(xpGainMath)
        }
        else {
            xpGain = collected.first().content.replace(/,/, "")
        }
        }).catch(err => {
            console.log(err)
        })
    }
    else if(xpNeededCancel > 1){
        timeCancel = 3
        message.channel.messages.fetch({limit: 1}).then(messages => {
            message.channel.bulkDelete(messages)
        }).then(msg.edit(cancelEmbed))
        return;
    }

    await message.channel.messages.fetch({limit: 1}).then(messages => {
        message.channel.bulkDelete(messages)
})

    if(timeCancel < 1){
        msg.edit(timePerRunEmbed)
        await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 15000
        }).then(collected => {
            if(collected.first() == null){
                derpyCancel = 6
                return message.reply("Cancelled due to no reply in 15 seconds").then(msg => {msg.delete({timeout: 5000})});
            }
            else if(collected.first().content.toLowerCase() === "cancel"){
                derpyCancel = 4
            message.channel.messages.fetch({limit: 1}).then(messages => {
                message.channel.bulkDelete(messages)
            }).then(msg.edit(cancelEmbed))
            return;
            }
        timePerRun = collected.first().content.replace(/,/, "")
        }).catch(err => {
            console.log(err)
        })
    }
    if(timeCancel > 1){
        return;
    }

    message.channel.messages.fetch({limit: 1}).then(messages => {
        message.channel.bulkDelete(messages)
    })

    
    //Ask if Derpy
    if(derpyCancel < 1){
        await msg.edit(derpyQuestionEmbed)
        await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 15000
        }).then(collected => {
            if(collected.first().content.toLowerCase() == null){
                derpyCancel = 2
                return message.reply("Cancelled due to no reply in 15 seconds").then(msg => {msg.delete({timeout: 5000})});
            }
            else if(collected.first().content.toLowerCase() === "cancel"){
                return message.reply("Cancelled").then(msg => {msg.delete({timeout: 5000})});
            }
        derpyQuestion = collected.first().content.replace(/,/, "")
        message.channel.messages.fetch({limit: 2}).then(messages => {
            message.channel.bulkDelete(messages)
        })
        }).catch(err => {
            console.log(err)
        })
    }

    else if(derpyCancel > 5){
        return;
    }
    else{
        return;
    }

    await message.channel.messages.fetch({limit: 2}).then(messages => {
        message.channel.bulkDelete(messages)
    })

    if(derpyQuestion.toLowerCase() === "yes") {
        derpyXpGainMath = xpGain*1.50
        derpyXpGain = Math.round(derpyXpGainMath)

        derpyRunsNeededMath = xpNeeded/derpyXpGain
        derpyRunsNeeded = Math.round(derpyRunsNeededMath)

        derpyTimeNeededMath = timePerRun*derpyRunsNeeded
        derpyHours = Math.floor(derpyTimeNeededMath / 60 / 60);
        derpyMinutes = Math.floor(derpyTimeNeededMath / 60) - (derpyHours * 60);
        derpySeconds = derpyTimeNeededMath % 60;
        derpySecondsRound = Math.round(derpySeconds)
        derpyTimeNeeded = derpyHours.toString().padStart(2, '0') + ':' + derpyMinutes.toString().padStart(2, '0') + ':' + derpySecondsRound.toString().padStart(2, '0');

        const derpyResults = new Discord.MessageEmbed()
        .setColor(randomColor)
        .setThumbnail(message.author.avatarURL())
        .setTitle("**Catacombs calculations (Including Derpy xp buff)**")
        .setFooter("If you notice any issues please do 's!support' and join the server for help")
        .addFields(
            {name: '**Amount of runs needed**', value: derpyRunsNeeded},
            {name: "**Time needed (Hours/Minutes/Seconds)**", value: derpyTimeNeeded},
        );
        message.channel.send(derpyResults).then(msg => {msg.delete({timeout: 40000})})
    }
    else {
        runsNeededMath = xpNeeded/xpGain
        runsNeeded = Math.round(runsNeededMath)
        timeNeededMath = timePerRun*runsNeeded
        hours = Math.floor(timeNeededMath / 60 / 60);
        minutes = Math.floor(timeNeededMath / 60) - (hours * 60);
        seconds = timeNeededMath % 60;
        secondsRound = Math.round(seconds)
        timeNeeded = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + secondsRound.toString().padStart(2, '0');


        const results = new Discord.MessageEmbed()
        .setColor(randomColor)
        .setThumbnail(message.author.avatarURL())
        .setTitle("**Catacombs calculations**")
        .setFooter("If you notice any issues please do 's!support' and join the server for help")
        .addFields(
            {name: '**Amount of runs needed**', value: runsNeeded},
            {name: "**Time needed (Hours/Minutes/Seconds)**", value: timeNeeded},
        );
        message.channel.send(results)
    }

}
    module.exports.help = {
      name: "catacalc",
      description: "Calculate how many runs is needed and how long it might take",
      usage: "s!catacalc"
    }
