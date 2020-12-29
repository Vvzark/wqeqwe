const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require("../ayarlar.json")
exports.run = (client,message,args) => {
let prefix = ayarlar.prefix
  
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısın!')

let seviyesistemi = db.get(`seviyesistemi_${message.guild.id}`)
if(!seviyesistemi) return message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **Seviye Sistemi Kapalı Gözüküyor.**\n\n Lütfen Açmak İçin **\`${prefix}seviye-sistemi aç\`** Komudunu Kullanınız.`)
.setColor("#ff0000"));
if(seviyesistemi == "açık") {


let xp = args.slice(0).join('')
if(!xp) return message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> Mesaj Başına **Kaç Puan Vermeliyim** Öncelikle Onu **Belirtmelisin**!\n\n Örnek Kullanım:**\`${prefix}puan-xp 4\`**\n\n **En az 1 Puan Girebilirsin!**`)
.setColor("#ff0000"));

if(isNaN(xp)) return message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **Sadece Sayı** Kabul Ediyorum Lütfen **Tekrar Dene!**\n\n Örnek Kullanım:**\`${prefix}puan-xp 4\`**\n\n **En az 1 Puan Girebilirsin!**`)
.setColor("#ff0000"));


db.set(`seviyexps_${message.guild.id}`, xp)
db.set(`seviyexpp_${message.guild.id}`,"ayarlı")
message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **Mesaj** Başına **Vereceğim Puan** Sayısını **\`${xp}\`** Olarak **Ayarladım.**\n\n Eğer Seviye Sistemini Kapamak İstersen: **\`${prefix}seviye-sistemi kapat\`**,Seviye Sistemini **Sıfırlamak** İstersen **\`${prefix}seviye-sistemi-sıfırla\`** Şeklinde **Kullanabilirsin.**`)
.setColor("#00ff51"));
}

}
exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["puan-xp"]
}

exports.help = {
name: 'seviye-xp'
}