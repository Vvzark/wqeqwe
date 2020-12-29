const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');


let prefix = ayarlar.prefix;

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(`Bu Komutu Kullanabilmek İçin "\`Yönetici\`" Yetkisine Sahip Olmalısın.`);
 	let kanal = message.mentions.channels.first()
    if(!kanal) 
message.channel.send(new Discord.MessageEmbed()
.setColor('#ff0000')
.setDescription(`**Hatalı Kullanım!** \n\nÖncelikle Bir **Log kanalı** Belirtmelisin!\n\n Örnek Kullanım: **\`${prefix}log-kanal #kanal\`**`))
  
 db.set(`isteklog_${message.guild.id}`, kanal.id)

message.channel.send(new Discord.MessageEmbed()
.setColor("#00ff51")
.setDescription(`**__BAŞARILI__**\n\n Log Kanalı **__Başarıyla__** <#${kanal.id}> Kanalı **__Olarak__** Ayarlandı.\n\n **__Log Kanalını Silmek İçin Başka Bir Kanal Açıp Log Kanalını Oraya Aktarın Ve Ardından Aktardığınız Kanalı Silin.__** `) 
);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['log-kanal','logkanal'],
  permLevel: "0"
};

exports.help = {
  name: "log-kanal",
  description: "şikayet edildiğinde mesajı hangi kanala atıcağını belirler",
  usage: "log-kanal <#kanal>"
};