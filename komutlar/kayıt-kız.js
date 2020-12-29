const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

let ototag =  db.fetch(`ototag_${message.guild.id}`);
let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let kızrol = db.fetch(`kızrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırol_${message.guild.id}`)
let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
  
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`> **Hata!**\n\n Bu Komudu Kullanabilmen İçin <@&${kayıtçı}> Adlı Role Sahip olman Lazım ! `))
if(message.channel.id !== kanal) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin ! `))
if (!kızrol) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<a:basarisiz:757851005483221022> Sunucuda Kız Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `))

let member = message.mentions.members.first();
if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<a:basarisiz:757851005483221022> Kız Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `))
let isim = args[1]
if (!isim) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<a:basarisiz:757851005483221022> İsmini Belirtmelisin ! `))
let yaş = args[2]
if (!yaş) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<a:basarisiz:757851005483221022> Yaşını Belirtmelisin ! `))
member.setNickname(`${ototag} ${isim} | ${yaş}`)
member.roles.remove(alınacakrol)
member.roles.add(kızrol) 

const AceBots = new discord.MessageEmbed()
.setColor('PURPLE')
.setDescription(`<a:sagok:757855573554233396> Kız Olarak Kayıt Edilen Kullanıcı: ${member} \n <a:sagok:757855573554233396> Kız Olarak Kayıt Eden Yetkili: <@!${message.author.id}> \n <a:sagok:757855573554233396> Kız Olarak Kayıt Eden Kullanıcının Kayıt Sayısı: **${kayıtsayı ? `**${kayıtsayı}**` : "0"}**`)
.addField(`Kullanıcının ismi;`, `${isim}`, true)
.addField(`Kullanıcının Yaşı;`, `${yaş}`, true)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(AceBots)
db.add(`kayıtsayı_${message.author.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['k'],
  permlevel: 0
}
exports.help = {
  name: 'kız',
  description: 'Kız olarak kayıt eder',
  usage: '!Kız @kullanıcı isim yaş'
}