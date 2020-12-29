const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")
exports.run = async(client, message, args) => {
  let prefix = ayarlar.prefix
  if(!message.member.hasPermission("KICK_MEMBERS")) return;
  if(!message.guild.members.cache.get(client.user.id).hasPermission("KICK_MEMBERS")) return;
     let kişi = message.mentions.users.first()
     let sebep = args.slice(1).join(" ")
     if(!kişi) {
       const ikrud = new Discord.MessageEmbed()
.setColor("#ff0000")
.setDescription(`> **Komudu** Lütfen **\`${prefix}kick @kullanıcı sebep\`** Şeklinde **Kullanınız!**`)
return message.channel.send(ikrud)
     }
     if(!sebep) sebep = `Sebep: Belirtilmemiş`
     if(kişi.id === message.guild.ownerID) {
       const pekabot = new Discord.MessageEmbed()
.setColor("#ff0000")
.setDescription(`**Sunucu Sahibini Atamazsın!**`)
return message.channel.send(pekabot)
     }
     if(kişi.id === client.user.id) {
       const pekabot = new Discord.MessageEmbed()
.setColor("#ff0000")
.setDescription(`**Beni Benlemi Atıcaksın?**`)
return message.channel.send(pekabot)
     }
     if(kişi.id === message.author.id) {
       const peka = new Discord.MessageEmbed()
.setColor("#ff0000")
.setDescription(`**Kendini Sunucudan Atamazsın!**`)
return message.channel.send(peka)
     }
     message.guild.member(kişi).kick({ reason: `Sebep: ${sebep} | Kullanıcıyı Atan Kişi ${message.author.tag}` })
 const ikrudka = new Discord.MessageEmbed()
.setColor("#ffcb00")
.setDescription(`**<@${kişi.user.id}> Adlı Üye Sunucudan Kicklendi**`)
return message.channel.send(ikrudka)
   }
exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['kickle',"at"],
    permLevel: 0
};
  exports.help = {
    name: 'kick',      
    description: 'Belirtilen Kişiyi Sunucudan Kickler',
    usage: 'kick <kullanıcı>'
};