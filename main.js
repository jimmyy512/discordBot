const Discord = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
var pttCrawler = require('pttCrawler');
var girlsURL = [];
// client.music = require("discord.js-musicbot-addon");
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  pttCrawler.crawler('Beauty', 0, 50, function (result) {
    for (let i = 0; i < result.length; i++) {
      console.log(result[i])
      if (result[i].pictures.length != 0) {
        for (let j = 0; j < result[i].pictures.length; j++) {
          girlsURL.push(result[i].pictures[j]);
        }
      }
    }
    console.log("美女圖網址爬蟲完成", girlsURL);
  });
});

client.on('message', async message => {
  console.log("message", message)

  if (message.content === 'ping') {
    message.reply('pong');
  }

  if (message.content === "!hot") {
    if (girlsURL.length == 0)
      message.reply("妹子圖爬蟲中,不要那麼猴急~");
    else {
      let randGirlURL = girlsURL[Math.floor(Math.random() * girlsURL.length) + 0];
      console.log("randGirlURL", randGirlURL)
      message.channel.send(randGirlURL);
    }
  }

  let split = message.content.split(" ");
  if (split[0] === '!call') {
    if (message.member.voice.channel) {
      let words = [
        "是的,大哥",
        "痾~我考慮一下要不要播",
        "你有女朋友我在播",
        ""
      ];
      message.reply('是的大哥!');
      message.member.voice.channel.join()
        .then(connection => {
          connection.play(ytdl(split[1], { quality: 'highestaudio' }));
        });
    } else {
      message.reply('請你先加入語音頻道再呼叫一次喔!');
    }
  }
});

client.login('');