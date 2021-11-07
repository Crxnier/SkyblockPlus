const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);
const { Client, Attachment, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
var abbreviate = require('number-abbreviate')

//Next level in how much xp needed doesn't actually work.

module.exports.run = async (bot, message, args) => {
    const filter = m => m.author.id === message.author.id;

    const xpNeededEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Slayer XP Calculator**")
    .setDescription("you have 15 seconds to reply to all message or else the operation will be cancelled, you can use , & abbreviations e.g. 30,000 or 30k\n\nHow much XP do you need?")
    .setFooter("If you notice any issues please do 's!support' and join the server for help");

    const bossTierEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Slayer XP Calculator**")
    .setDescription("What tier boss are you doing?\n1,2,3,4 or 5")
    .setFooter("If you notice any issues please do 's!support' and join the server for help");

    const killTimeEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Slayer XP Calculator**")
    .setDescription("How long is your average spawn and kill time (In seconds)?")
    .setFooter("If you notice any issues please do 's!support' and join the server for help");

    const aatroxQuestionEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Slayer XP Calculator**")
    .setDescription("Would you like Aatrox mayor buffs to be included? (yes/no)")
    .setFooter("If you notice any issues please do 's!support' and join the server for help");

    const cancelEmbed = new Discord.MessageEmbed()
    .setColor(randomColor)
    .setThumbnail(message.author.avatarURL())
    .setTitle("**Slayer XP Calculator**")
    .setDescription(`Cancelled! This is caused by saying "cancel" or by inputting an invalid statement`)
    .setFooter("If you notice any issues please do 's!support' and join the server for help");

    var xpNeeded = "";
    var bossXp = "";
    var bossPrice = "";
    var runTime = "";
    var aatroxQuestion = "";
    var bossRound = "";
    var timeEstimation = "";
    var savingsQuestion = "";

    var cancel = "";
    var cancel1 = "";
    var cancel2 = "";
    var cancel3 = "";
    var cancel4 = "";

    async function deleteMessages() {
        await message.channel.messages.fetch({limit: 1}).then(messages => {
            message.channel.bulkDelete(messages)
        })
    }

    msg = await message.channel.send(xpNeededEmbed)
    await message.channel.awaitMessages(filter, {
        max: 1, 
        time: 15000
    }).then(collected => {
        if(collected.first().content.toLowerCase() === "cancel"){
            cancel = 1

        }
        else {
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
            else if(xpNeeded.content.includes(",")){
                xpNeeded = xpNeeded.content.replace(/,/,"")
            }

            xpNeeded = parseInt(xpNeeded)
        }
    }).catch(err => {
        console.log(err)
    })

    if(!Number.isInteger(xpNeeded)){
        cancel = 1
    }


    if(cancel > 0){
        deleteMessages()
        msg.edit(cancelEmbed)
        return;
    }
    else{
        deleteMessages()
        msg.edit(bossTierEmbed)
        await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 15000
        }).then(collected => {
            if(collected.first().content.toLowerCase() === "cancel"){
                msg.edit(cancelEmbed)
                cancel1 = 1
            }
            if(collected.first().content.toLowerCase() === "5"){
                bossXp = "1500"
                bossPrice = "100000"
            }
            if(collected.first().content.toLowerCase() === "4"){
                bossXp = "500"
                bossPrice = "50000"
            }
            if(collected.first().content.toLowerCase() === "3"){
                bossXp = "100"
                bossPrice = "20000"
            }
            if(collected.first().content.toLowerCase() === "2"){
                bossXp = "25"
                bossPrice = "7500"
            }
            if(collected.first().content.toLowerCase() === "1"){
            bossXp = "5"
            bossPrice = "2000"
            }
            
        }).catch(err => {
            console.log(err)
        })
    }
    
    if(cancel1 > 0){
        deleteMessages()
        msg.edit(cancelEmbed)
        return;
    }
    else{
        deleteMessages()
        msg.edit(killTimeEmbed)
        await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 15000
        }).then(collected => {
            if(collected.first().content.toLowerCase() === "cancel"){
                cancel2 = 1
                msg.edit(cancelEmbed)
            }
        runTime = collected.first().content.replace(/,/, "")

        }).catch(err => {
            console.log(err)
        })
    }

    if(cancel2 > 0){
        deleteMessages()
        msg.edit(cancelEmbed)
        return;
    }
    else{
        deleteMessages()
        msg.edit(aatroxQuestionEmbed)
        await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 15000
        }).then(collected => {
            if(collected.first().content.toLowerCase() === "cancel"){
                cancel3 = 1
                msg.edit(cancelEmbed)
                    
            }
        aatroxQuestion = collected.first().content.replace(/,/, "")
        }).catch(err => {
            console.log(err)
        })
    }


    function aatrox(){
        aatroxBossXp = bossXp * 1.25 
        aatroxBossPrice = bossPrice * 0.5

        aatroxCostMaths = xpNeeded / aatroxBossXp * aatroxBossPrice
        aatroxCostRound = Math.round(aatroxCostMaths)
        aatroxCost = abbreviate(aatroxCostRound, 2)

        aatroxBossesMaths = xpNeeded / aatroxBossXp
        aatroxBosses = Math.round(aatroxBossesMaths)

        aatroxTimeEstimation = runTime * aatroxBosses
        hours = Math.floor(aatroxTimeEstimation / 60 / 60);
        minutes = Math.floor(aatroxTimeEstimation / 60) - (hours * 60);
        seconds = aatroxTimeEstimation % 60;
        secondsRound = Math.round(seconds)
        aatroxTime = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + secondsRound.toString().padStart(2, '0');
    }

    if(cancel3 > 0){
        deleteMessages()
        msg.edit(cancelEmbed)
        return;
    }
    else {
        deleteMessages()
        if(aatroxQuestion.toLowerCase() === "yes"){ 
            aatrox()
            const aatroxResults = new Discord.MessageEmbed()
            .setColor(randomColor)
            .setThumbnail(message.author.avatarURL())
            .setTitle("**Slayer calculations (Including Aatrox buff)**")
            .setFooter("If you notice any issues please so 's!support' and join the server for help")
            .addFields(
                {name: '**Amount of bosses needed**', value: aatroxBosses},
                {name: "**Time needed (Hours/Minutes/Seconds)**", value: aatroxTime},
                {name: "**It'll cost**", value: aatroxCost + " coins"}
            );
            
            msg.edit(aatroxResults)
        }
        else {
            bosses = xpNeeded / bossXp
            bossRound = Math.round(bosses)

            cost = bosses * bossPrice
            costRound = Math.round(cost)
            cost = abbreviate(costRound, 2)

            timeEstimation = runTime * bosses
            hours = Math.floor(timeEstimation / 60 / 60);
            minutes = Math.floor(timeEstimation / 60) - (hours * 60);
            seconds = timeEstimation % 60;
            secondsRound = Math.round(seconds)
            var timeFinal = hours.toString().padStart(2, '0') + ':' + minutes.toString().padStart(2, '0') + ':' + secondsRound.toString().padStart(2, '0');

            const results = new Discord.MessageEmbed()
            .setColor(randomColor)
            .setThumbnail(message.author.avatarURL())
            .setTitle("**Slayer calculations**")
            .setFooter("If you notice any issues please so 's!support' and join the server for help")
            .addFields(
                {name: '**Amount of bosses needed**', value: bossRound},
                {name: "**Time needed (Hours/Minutes/Seconds)**", value: timeFinal},
                {name: "**It'll cost**", value: cost + " coins"}
            );
            msg.edit(results);
    }

    if(cancel4 > 0){
        deleteMessages()
        msg.edit(cancelEmbed)
        return;
    }
    else{
        deleteMessages()
        message.reply("Would you like to see how much you save with Aatrox? (Yes/No)")
        await message.channel.awaitMessages(filter, {
            max: 1, 
            time: 15000
        }).then(collected => {
            if(collected.first().content.toLowerCase() === "no"){
                return;
            }
        savingsQuestion = collected.first().content.replace(/,/, "")
        })
    }

    if(savingsQuestion.toLowerCase() === "yes"){
        aatrox()

        savingCostMath = costRound-aatroxCostRound
        savingCostRound = Math.round(savingCostMath)
        savingCost = abbreviate(savingCostRound, 2)
        savingBossesMaths = bosses-aatroxBosses
        savingBosses = Math.round(savingBossesMaths)
        savingTimeMath = timeEstimation-aatroxTimeEstimation
        savingHours = Math.floor(savingTimeMath / 60 / 60);
        savingMinutes = Math.floor(savingTimeMath / 60) - (hours * 60);
        savingSeconds = savingTimeMath % 60;
        savingSecondsRound = Math.round(seconds)
        var savingTime = savingHours .toString().padStart(2, '0') + ':' + savingMinutes.toString().padStart(2, '0') + ':' + savingSecondsRound.toString().padStart(2, '0');

        const savingResults = new Discord.MessageEmbed()
        .setColor(randomColor)
        .setThumbnail(message.author.avatarURL())
        .setTitle("**Slayer calculations**")
        .setFooter("If you notice any issues please so 's!support' and join the server for help")
        .addFields(
            {name: '**Amount of bosses saved**', value: savingBosses},
            {name: "**Time saved (Hours/Minutes/Seconds)**", value: savingTime},
            {name: "**Coins saved**", value: savingCost + " coins"}
        );

        msg.edit(savingResults)
    }
    else {
        return;
    }
    }

}  
module.exports.help = {
  name: "slayercalc",
  description: "Calculate how much time, money and bosses are needed for X amount of xp",
  usage: "s!slayercalc"
}