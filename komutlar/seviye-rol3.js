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

let rol = message.mentions.roles.first()
if(!rol) return message.channel.send(new Discord.MessageEmbed()
     .setTitle(`PekaBot Seviye Sistemi`)               
.setDescription(`\n\n\n**Bir Rol Etiketlemeyi Unuttun!**\n\n> **Örnek Kullanım:** **\`${prefix}seviye-rol #kanal\`**.`)
                                     .setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
                                     .setTimestamp()
                                     .setFooter(`${message.author.username} Tarafından İstendi!`)
.setColor("#ff0000"));



db.set(`seviyerol1_${message.guild.id}`, rol.id)

message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **PekaBot Seviye Sistemi** \n\n 3.Seviye İçin Ayarlamak İstediğin Rol <@${rol.id}> Olarak Ayarlandı!`)
.setColor("GREEN"));
}
}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["s-rol3","seviye-rol3","srol3"]
}

exports.help = {
name: 'seviye-rol3'
}