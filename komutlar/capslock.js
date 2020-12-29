const Discord = require('discord.js');
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')

exports.run = async (client, message, args) => {
  
  let prefix = await require('quick.db').fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(new Discord.MessageEmbed().setColor("RED").setDescription(`:fire: Yeterli yetki, bulunmamakta!`))
  
  let capslock = await db.fetch(`capslock_${message.guild.id}`)
  if (capslock) {
    db.delete(`capslock_${message.guild.id}`)
    message.channel.send(new Discord.MessageEmbed()
.setColor('#00ff51')
.setDescription(`> **Başarıyla Kapatıldı!** \n\n **CapsLock Engel Sistemi \`Başarıyla Kapatıldı\`**`))
  }
 
  if (!capslock) {
    db.set(`capslock_${message.guild.id}`, 'acik')
    message.channel.send(new Discord.MessageEmbed()
.setColor('#00ff51')
.setDescription(`> **Başarıyla Açıldı!** \n\n **CapsLock Engel Sistemi \`Başarıyla Açıldı\`**`))
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['capslock-engel','cs-engel'],
  permLevel: 3
};

exports.help = {
  name: 'capslock-engelleme',
  category: 'Moderasyon komutları!',
  description: 'Capslock kullanımını engeller.',
  usage: 'capslock-engelleme'
};