const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = (client,message,args) => {
  let prefix = ayarlar.prefix


let seviyesistemi = db.get(`seviyesistemi_${message.guild.id}`)
if(!seviyesistemi) return message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **Seviye Sistemi Kapalı Gözüküyor.**\n\n Lütfen Açmak İçin **\`${prefix}seviye-sistemi aç\`** Komudunu Kullanınız.`)
.setColor("#ff0000"));
if(seviyesistemi == "açık") {


let xp = db.get(`xpss_${message.guild.id}_${message.author.id}`)
message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **Toplam** Seviyen **Biriken** Seviyen: **\`${xp || "0"}\`** `)
.setColor("#00ff51"));
}
}

//${xp || "0"} 
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["rank","seviye","puan"]
}

exports.help = {
name: 'seviyem'
}
