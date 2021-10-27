const Discord = require("discord.js");
require('discord-reply');
const bot = new Discord.Client({disableEveryone: true});
const randomColor = ((1 << 24) * Math.random() | 0).toString(16);
const { Client, Attachment, Message, MessageEmbed } = require("discord.js");
const moment = require('moment');
const fs = require("fs");
const request = require('request');
var abbreviate = require('number-abbreviate')

module.exports.run = async (bot, message, args) => {
  const noLink = new Discord.MessageEmbed()
  .setColor(randomColor)
  .setThumbnail(message.author.avatarURL())
  .setTitle("**Error**")
  .setDescription("You are not linked! Please do **s!link**")
  .setFooter("If you notice any issues please do 's!support' and join the server for help")
  var path = `C:/Users/Super/Downloads/SkyblockPlusBot/playerinfo/${message.author.id}.json`
            fs.access(path, (err) => {
              if (err) {
                message.lineReply(noLink)
                return;
              }
              else {
                var user = JSON.parse(fs.readFileSync(path, 'utf8'));
                //user.UUID user.PROFILE_ID user.ARRAYPOS user.username
                var apiPath = `C:/Users/Super/Downloads/SkyblockPlusBot/HypixelAPI.json`
                fs.access(apiPath, fs.F_OK, (err) => {
                  if (err) {
                    if (err) throw err;
                  }
                    else {
                      hypAPI = JSON.parse(fs.readFileSync(apiPath, 'utf8'));
                      secretUrl = `https://api.hypixel.net/player?key=${hypAPI.API}&uuid=${user.UUID}`
                      request(secretUrl, function (error, response, body) {
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
                          hypixelAch = JSON.parse(body)
                          global.secretCount = hypixelAch['player'][`achievements`]['skyblock_treasure_hunter']
                        }
                      })

                      url = `https://api.hypixel.net/skyblock/profiles?key=${hypAPI.API}&uuid=${user.UUID}`
                      request(url, function (error, response, body) {
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
                          cataAbbrev = abbreviate(cataXp, 2)
                          var path = `C:/Users/Super/Downloads/SkyblockPlusBot/catacombs/cataxp.json`
                          var table = JSON.parse(fs.readFileSync(path, 'utf8'));

                          for (let i = 1; i < 51; i++){
                            if(table['levels'][i.toString()] > cataXp){
                              currentLevel = i-1;
                              currentLevelXp = table['levels'][`${currentLevel}`]
                              nextLevel = currentLevel+1
                              xpProgress = cataXp - currentLevelXp
                              xpProgressAbbrev = abbreviate(xpProgress, 2)
                              break
                            }
                          }
                          var perLevelJson = `C:/Users/Super/Downloads/SkyblockPlusBot/catacombs/cataxpneeded.json`
                          var xpPerLevel = JSON.parse(fs.readFileSync(perLevelJson, 'utf8'));
                          nextLevelXp = xpPerLevel['xpPerLevel'][`${nextLevel}`]
                          nextLevelXpAbbrev = abbreviate(nextLevelXp, 2)
                          percentageToNextLevel = xpProgress/nextLevelXp*100
                          percentageToNextLevelRound = parseFloat(percentageToNextLevel.toFixed(1));

                          enteranceFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['0']
                          firstFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['1']
                          secondFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['2']
                          thirdFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['3']
                          fourthFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['4']
                          fifthFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['5']
                          sixthFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['6']
                          seventhFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['tier_completions']['7']

                          totalEnteranceFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['0']
                          totalFirstFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['1']
                          totalSecondFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['2']
                          totalThirdFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['3']
                          totalFourthFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['4']
                          totalFifthFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['5']
                          totalSixthFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['6']
                          totalSeventhFloor = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['dungeon_types']['catacombs']['times_played']['7']
                          failEnteranceFloor = totalEnteranceFloor-enteranceFloor
                          failFirstFloor = totalFirstFloor-firstFloor
                          failSecondFloor = totalSecondFloor-secondFloor
                          failThirdFloor = totalThirdFloor-thirdFloor
                          failFourthFloor = totalFourthFloor-fourthFloor
                          failFifthFloor = totalFifthFloor-fifthFloor
                          failSixthFloor = totalSixthFloor-sixthFloor
                          failSeventhFloor = totalSeventhFloor-seventhFloor
                          totalFloorfail = failEnteranceFloor+failFirstFloor+failSecondFloor+failThirdFloor+failFourthFloor+failFifthFloor+failSixthFloor+failSeventhFloor

                          totalFloor = enteranceFloor+firstFloor+secondFloor+thirdFloor+fourthFloor+fifthFloor+sixthFloor+seventhFloor+totalFloorfail

                          beserkerLevelXp = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['player_classes']['berserk']['experience']
                          for (let i = 1; i < 51; i++){
                            if(table['levels'][i.toString()] > beserkerLevelXp){
                              beserkerLevel = i-1;
                              break
                            }
                          }
                          healerLevelXp = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['player_classes']['healer']['experience']
                          for (let i = 1; i < 51; i++){
                            if(table['levels'][i.toString()] > healerLevelXp){
                              healerLevel = i-1;
                              break
                            }
                          }
                          mageLevelXp = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['player_classes']['mage']['experience']
                          for (let i = 1; i < 51; i++){
                            if(table['levels'][i.toString()] > mageLevelXp){
                              mageLevel = i-1;
                              break
                            }
                          }
                          archerLevelXp = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['player_classes']['archer']['experience']
                          for (let i = 1; i < 51; i++){
                            if(table['levels'][i.toString()] > archerLevelXp){
                              archerLevel = i-1;
                              break
                            }
                          }
                          tankLevelXp = hypixel['profiles'][`${user.ARRAYPOS}`]['members'][`${user.UUID}`]['dungeons']['player_classes']['tank']['experience']
                          for (let i = 1; i < 51; i++){
                            if(table['levels'][i.toString()] > tankLevelXp){
                              tankLevel = i-1;
                              break
                            }
                          }
                            
                          global.dungeonInfo = new Discord.MessageEmbed()
                          .setColor(randomColor)
                          .setThumbnail(message.author.avatarURL())
                          .setTitle(`${user.USERNAME}`)
                          .addFields(
                            {name: `Catacombs ${currentLevel}`, value: `Cata xp: ${cataAbbrev}\nProgress: ${xpProgressAbbrev}/${nextLevelXpAbbrev} (${percentageToNextLevelRound}%)\nSecrets found: ${secretCount}`, inline: true},
                            {name: `Amount of runs ${totalFloor}`, value: `Enterance floor: ${enteranceFloor}\nF1: ${firstFloor}\nF2: ${secondFloor}\nF3: ${thirdFloor}\nF4: ${fourthFloor}\nF5: ${fifthFloor}\nF6: ${sixthFloor}\nF7: ${seventhFloor}\nFailed runs: ${totalFloorfail}`, inline: true},
                            {name: `Class levels`, value: `Beserker ${beserkerLevel}\nMage ${mageLevel}\nArcher ${archerLevel}\nTank ${tankLevel}\nHealer ${healerLevel}`}
                          )
                          .setFooter("If you notice any issues please do 's!support' and join the server for help")

                          
                        }
        })
      }
    })
  }
})  
}         
module.exports.help = {

  name: "dungeon",
  description: "Show all your dungeon information",
  usage: "s!dungeon"
}
