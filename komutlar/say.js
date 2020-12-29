const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
exports.run = (client, message) => {
  let prefix = ayarlar.prefix
  let üye = new Discord.MessageEmbed()
    .setAuthor("Sunucu Hakkında")
    .setColor("#ff0000")
  .addField("**Toplam Kullanıcı**",message.guild.memberCount )
  .addField("**Çevrimiçi Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'online').size)
  .addField("**Boşta Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'idle').size)
  .addField("**Rahatsız Etmeyindeki Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'dnd').size)
  .addField("**Çevrimdışı Kullanıcılar**",message.guild.members.cache.filter(o => o.presence.status === 'offline').size)
.addField(`**Sunucudaki Metin Kanalları**`, `${message.guild.channels.cache.filter(c => c.type === "text").size}`)
    .addField(`**Sunucuda Bulunan Ses Kanalları**`, `${message.guild.channels.cache.filter(c => c.type === "voice").size}`, false)
  .addField(`**Sunucudaki Rol Sayısı**`, `${message.guild.roles.cache.size}`)      
.addField(`**Sunucudaki Emoji Sayısı**`, `  ${message.guild.emojis.cache.size}`)
  .setImage(message.guild.iconURL)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
    .setTimestamp()
  return message.channel.send(üye);
};

module.exports.conf = {
  aliases: ["sbilgi","say","sunucu-durum"],
  permLevel: 0,
  enabled: true,
  guildOnly: true
};

module.exports.help = {
  name: "sunucu-bilgi",
  description: "Sunucu Hakkında Bilgiler Verir.",
  usage: 'sunucu-bilgi'
};
