const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = (client,message,args) => {
let prefix = ayarlar.prefix
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`Bu komutu kullanabilmek için **\`Yönetici\`** yetkisine sahip olmalısın!`))

let seviyesistemi = db.get(`seviyesistemi_${message.guild.id}`)
if(!seviyesistemi) return message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **Seviye Sistemi Kapalı Gözüküyor.**\n\n Lütfen Açmak İçin **\`${prefix}seviye-sistemi aç\`** Komudunu Kullanınız.`)
.setColor("#ff0000"));
if(seviyesistemi == "açık") {

let log = message.mentions.channels.first() 
if(!log) return message.channel.send(new Discord.MessageEmbed()
     .setTitle(`PekaBot Seviye Sistemi`)               
.setDescription(`\n\n\n**Öncelikle Bir Kanal Etiketlemelisin!**\n\n> **Örnek Kullanım:** **\`${prefix}seviye-log #kanal\`**.`)
                                     .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
                                     .setTimestamp()
                                     .setFooter(`${message.author.username} Tarafından İstendi!`)
.setColor("#ff0000"));
  



db.set(`seviyelog_${message.guild.id}`, log.id)
message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **PekaBot Seviye Sistemi** \n\n **Seviye Sistemi Log Kanalı** <#${log.id}> **Olarak Ayarlandı.**\n\n> **Not:** Seviye Sistemi Log Kanalını Sıfırlamak İçin Log Kanalını Başka Bir Kanala Aktarıp O Kanalı Silin.`)
.setColor("GREEN"));
      
}
}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}

exports.help = {
name: 'seviye-log'
}