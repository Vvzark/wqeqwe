const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
const db = require('quick.db');


var prefix = ayarlar.prefix;

exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(new Discord.MessageEmbed()
.setDescription(`**__Hata__!**Hata!**\n\n Bu Komudu Kullanabilmek İçin **\`Yönetici\`** Yetkisine Sahip Olmalısın! `) 
.setColor("#ff0000"));
 	let kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription('HATA! \n\n Öncelikle Log Kanalını Belirtmelisin! \n\n Örnek Kullanım: **__!log-kanal #kanal__**'))
 db.set(`başvurulog_${message.guild.id}`, kanal.id)

message.channel.send(new Discord.MessageEmbed()
.setDescription(`**__BAŞARILI__**\n\n Log Kanalı **__Başarıyla__** <#${kanal.id}> Kanalı **__Olarak__** Ayarlandı.\n\n **__Log Kanalını Silmek İçin Başka Bir Kanal Açıp Log Kanalını Oraya Aktarın Ve Ardından Aktardığınız Kanalı Silin.__** `) 
.setColor("#00ff51"));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['logkanal'],
  permLevel: "0"
};

exports.help = {
  name: "log-kanal",
  description: "şikayet edildiğinde mesajı hangi kanala atıcağını belirler",
  usage: "log-kanal <#kanal>"
};