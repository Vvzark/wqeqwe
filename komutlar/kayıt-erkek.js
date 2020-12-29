const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

let kanal = db.fetch(`kayıtkanal_${message.guild.id}`)
let alınacakrol = db.fetch(`alınacakrol_${message.guild.id}`)
let erkekrol = db.fetch(`erkekrol_${message.guild.id}`)
let kayıtçı = db.fetch(`kayıtçırol_${message.guild.id}`)
let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
let ototag =  db.fetch(`ototag_${message.guild.id}`);

  
if(!message.member.roles.cache.has(kayıtçı)) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Kullanabilmen İçin <@&${kayıtçı}> Adlı Role Sahip olman Lazım ! `))
if(message.channel.id !== kanal) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Bu Komudu Sadece <#${kanal}> Adlı Kanalda Kullanabilirsin ! `))
if (!erkekrol) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Sunucuda Erkek Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `))

let member = message.mentions.members.first();
if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Erkek Olarak Kayıt Edeceğin Kullanıcıyı Belirtmelisin ! `))
let isim = args[1]
if (!isim) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> İsmini Belirtmelisin ! `))
let yaş = args[2]
if (!yaş) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Yaşını Belirtmelisin ! `))
member.setNickname(`${ototag} ${isim} | ${yaş}`)
member.roles.remove(alınacakrol)
member.roles.add(erkekrol)

const acebots = new discord.MessageEmbed()
.setColor('BLUE')
.setDescription(`<a:sagok:757855573554233396> Erkek Olarak Kayıt Edilen Kullanıcı: ${member} 
                 \n <a:sagok:757855573554233396> Erkek Olarak Kayıt Eden Yetkili: <@!${message.author.id}> 
                 \n <a:sagok:757855573554233396> Erkek Olarak Kayıt Eden Kullanıcının Kayıt Sayısı: **${kayıtsayı ? `${kayıtsayı}` : "0"}**`)
.addField(` Kullanıcının İsmi;`, `${isim}`, true)
.addField(` Kullanıcının Yaşı;`, `${yaş}`, true)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(acebots)
db.add(`kayıtsayı_${message.author.id}`, 1)
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['e'],
  permlevel: 0
}
exports.help = {
  name: 'erkek',
  description: 'Erkek olarak kayıt eder',
  usage: '!erkek @kullanıcı isim yaş'
}