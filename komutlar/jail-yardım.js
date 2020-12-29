const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor("#3a00fe")
.setAuthor(`Jail Yardım Menüsü`)
.setDescription
(`:white_small_square:  \`${prefix}jail-rol\` \n **Cezalı Rolünü Belirlemenize Yarar.**\n
  :white_small_square:  \`${prefix}jail-yetkili\` \n **Cezalıya Atıcak Yetkili Rolünü Belirlemenizi Sağlar.**\n
  :white_small_square:  \`${prefix}jail-log\` \n **Cezalıya Atıldığında Bilgilendirme Mesajının Nereye Gideceğini Belirlersiniz.**\n
  :white_small_square:  \`${prefix}jail\` \n **Kullanıcıyı Cezalıya Atmanıza Yarar.**

[**Youtube**](https://www.youtube.com/channel/UCE3lbQitBJQDbIlSzwtmL8g/)    **|**    [**Discord**](https://discord.gg/TGDNRDW)     **|**     [**Bot Davet**](https://discord.com/oauth2/authorize?client_id=771359782358745088&scope=bot&permissions=8)
`)
//.addField(``,``,true)

.setTimestamp()
//.setImage("https://cdn.discordapp.com/attachments/720582739941916683/780714816120815636/standard.gif")
.setFooter(`${message.author.username} Tarafından İstendi!`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: 1,
  guildOnly: 1, 
  aliases: ['jail-help','jailhelp','jailyardım'], 
  permLevel: 0
};

exports.help = {
  name: "jail-yardım",
  description: 'Jail Yardım Menüsü.',
  usage: 'jail-yardım'
};