const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = (client,message) => {
let prefix = ayarlar.prefix



 let embed = new Discord.MessageEmbed()
.setColor('#00cfff')
.setTitle('Seviye sistemi;')
.setDescription(`**Komutlar:** \n\n **\`${prefix}seviye-sistemi aç - kapat\`** \n **Seviye sistemini açar veya kapatır.**\n\n **\`${prefix}seviye-xp\`** \n **Mesaj başına verecek puanı ayarlar.** \n\n **\`${prefix}seviye-log #kanal\`** \n **Seviye Atlayan Üyenin Belirlenen Kanala Ayrıntılı Tebrik Mesajını Atar.** \n\n **\`${prefix}seviye-rol @rol\`** \n **Seviye atlayınca verilecek rolü belirlemenizi sağlar.** \n\n **\`${prefix}seviye-rol2 @rol\`** \n **Seviye Atlayınca Verilecek Rolü Belirlersiniz.** \n\n \**\`${prefix}seviye-rol3 @rol\`** \n **Seviye Atlayınca Verilecek Rolü Belirlersiniz.** \n\n **\`${prefix}seviye-rol4 @rol\`** \n **Seviye Atlayınca Verilecek Rolü Belirlersiniz.**`)
.setFooter(`${message.author.tag} Adlı kişi tarafından istendi.`)
message.channel.send(embed)
}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: ["syardım","shelp","level-help","level-h","s-yardım","puan-yardım"]
}

exports.help = {
name: 'seviye-yardım'
}