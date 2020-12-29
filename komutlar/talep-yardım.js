const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor('#00ffa6')
.setAuthor(`PekaBOT Talep / Şikayet / Başvuru Yardım Menüsü`)
.addField(`${prefix}başvuru`,`Herhangi Bir Konu Hakkında Formu Yapılmasını Sağlar.`,true)
.addField(`${prefix}şikayet`,`Kişi Veya Sunucu Hakkında Şikayet Bildirmellerine Olanak Sağlar.`,true)
.addField(`${prefix}istek`,`Sunucu Hakkında İstek Bildirmelerini Sağlar.`,true)
.setDescription('**__Not:__** Bu Komutların Log Kanalını Ayarlamak İçin Lütfen **`\!log-kanal #kanal`\** Şeklinde Belirtiniz.')
//.addField(``,``,true)



.setTimestamp()
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setFooter(`Komutu Kullanan Kişi -  ${message.author.username} Komutu Kullanan Kullanıcı İD - ${message.author.id}`)
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['talepyardım','talepkomutları','istekyardım','istek-yardım','başvuru-yardım','başvuruyardım','log-yardım','logyardım'], 
  permLevel: 0
};

exports.help = {
  name: "talep-yardım",
  description: 'Talep / İstek / Şikayet Yardım Menüsü.',
  usage: 'talep-yardım'
};