const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor("#3a00fe")
.setAuthor(`Yardım Menüsü | GELİŞTİRME AŞAMASINDA`)
.setDescription(`
:white_small_square:  \`${prefix}moderasyon\` \n **Moderasyon Komutlarını Gösterir.**\n
:white_small_square:  \`${prefix}kullanıcı\` \n **Kullanıcı Komutlarını Gösterir.**\n
:white_small_square:  \`${prefix}kayıt-yardım\` \n **Kayıt Komutlarını Gösterir.**\n
:white_small_square:  \`${prefix}jail-yardım\` \n **Jail Komutlarını Gösterir.**\n
:white_small_square:  \`${prefix}eğlence - Yakında\` \n **Eğlence Komutlarını Gösterir.**\n
» **▬▬▬▬▬▬** Log Menüsü **▬▬▬▬▬▬▬** «

:white_small_square: ${prefix}talep-yardım\n Hangi **Talep / İstek / Başvuru** Komutlarının Olduğunu Ve **Log Kanallarının** Nasıl Ayarlanılacağını **Gösterir**.\n
**» ▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬ «**\n
[**Youtube**](https://www.youtube.com/channel/UCE3lbQitBJQDbIlSzwtmL8g/)    **|**    [**Discord**](https://discord.gg/TGDNRDW)     **|**     [**Bot Davet**](https://discord.com/oauth2/authorize?client_id=771359782358745088&scope=bot&permissions=8)
`)
//.addField(``,``,true)

.setTimestamp()
//.setImage("https://cdn.discordapp.com/attachments/720582739941916683/780714816120815636/standard.gif")
.setFooter(`${message.author.tag} Tarafından İstendi!`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: 1,
  guildOnly: 1, 
  aliases: ['help','y','komutlar'], 
  permLevel: 0
};

exports.help = {
  name: "yardım",
  description: 'Yardım Menüsü.',
  usage: 'yardım'
};