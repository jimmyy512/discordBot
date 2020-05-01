var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
  colorize: true
});
logger.level = "debug";

var client = new Discord.Client({
  token: auth.token,
  autorun: true
});

client.on("ready", function (evt) {
  logger.info("Connected");
  logger.info("Logged in as: ");
  logger.info(client.username + " - (" + client.id + ")");
});

client.on("message", (user, userID, channelID, message, evt) => {
  console.log("wtf", user, userID, channelID, message, evt)

  robotTalk(channelID, "我可愛ㄇ")
  // robotGoUserIDChannel(userID)
  // console.log(user, userID, channelID, message, evt)
  if (message.substring(0, 1) == '!') {

    var args = message.substring(1).split(' ');
    console.log("test")
    switch (args[0]) {
      case 'play':
        console.log("playyyy", args)
        if (!args[1]) {
          client.sendMessage({
            to: channelID,
            message: "u need to provide a link!"
          });
        }

        robotGoUserIDChannel(userID)
        break;
    }
  }

});

const robotGoUserIDChannel = (userID) => {
  let userInChannelID = Object.keys(client.channels).reduce((userInChannelID, it) => {
    if (client.channels[it].members[userID] !== undefined)
      userInChannelID = it;
    return userInChannelID;
  }, false);

  client.joinVoiceChannel(userInChannelID, (err, res) => { })
}

const robotTalk = (channelID, message) => {
  client.sendMessage({
    to: channelID,
    message: message
  });
}