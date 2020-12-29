const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor("#3a00fe")
.setAuthor(`PekaBOT Yardım Menüsü | GELİŞTİRME AŞAMASINDA`)
.setDescription(`
:white_small_square: ${prefix}afk \n **Sebep Girerek Afk Olduğunuzu Diğer İnsanlara Etiketlenirseniz Bildirir.**\n
:white_small_square: ${prefix}avatar \n **Komudu Kullananın Yada Etiketlenenin Avatarını Gösterir.**\n
:white_small_square: ${prefix}profil \n **Etiketlenen Yada Komudu Kullanan Kişi Hakkında Bilgi Verir.**\n

[**Youtube**](https://www.youtube.com/channel/UCE3lbQitBJQDbIlSzwtmL8g/)    **|**    [**Discord**](https://discord.gg/TGDNRDW)     **|**     [**Bot Davet**](https://discord.com/oauth2/authorize?client_id=771359782358745088&scope=bot&permissions=8)
`)
//.addField(``,``,true)

.setTimestamp()
.setFooter(`${message.author.username} Tarafından İstendi! | Kullanıcı İD - ${message.author.id}`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['user-help','kullanıcı-yardım','kullanıcı'], 
  permLevel: 0
};

exports.help = {
  name: "Kullanıcı",
  description: ' Kullanıcı Yardım Menüsü.',
  usage: 'kullanıcı'
};