const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor("LİME")
.setAuthor(`PekaBOT Sahibi`)
.setImage("https://cdn.discordapp.com/attachments/774967166607818772/775057816972034109/sade.jpg")
.setColor("BLUE")
.setDescription(`> İletişim Ve Sponsorluk İçin\n\n [Youtube](https://www.youtube.com/channel/UCE3lbQitBJQDbIlSzwtmL8g?view_as=subscriber) | [Discord Sunucu](https://discord.gg/TGDNRDW) | ιKrµÐKΛ#0112`)
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ["owner","developer","yapımcı"], 
  permLevel: 0
};

exports.help = {
  name: "yapımcım",
  description: '',
  usage: 'yapımcım'
};