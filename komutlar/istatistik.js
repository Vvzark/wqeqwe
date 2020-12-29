const  Discord = require("discord.js"); 
const moment = require("moment")
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args) => {

  
const istatistikler = new Discord.MessageEmbed()
.setColor("RANDOM")
  .addField(`> :scroll: »  Pingim` ,`> ${client.ws.ping}ms`)
  .addField(`> :incoming_envelope: » Yapımcım` ,`> <@354227296317472769> **|** **\`ιKrµÐKΛ#0112\`**`)
  .addField(`> :label: » Node.js`, `> ${process.version}`)
  .addField(`> :label: » Discord.js Sürüm`, `> v${Discord.version}`)
  .addField(`> :bar_chart: » Kanal Sayısı`, `> ${client.channels.cache.size}`)
  .addField(`> :postbox: » Kullanıcı Sayısı`, `> ${client.users.cache.size}`)
  .addField(`> :envelope: » Sunucu Sayısı`, `> ${client.guilds.cache.size}`)
  .addField(`> :bar_chart: » Bağlantılarımız`, `> [Destek Sunucusu](https://discord.gg/ze35GuJWjn) | [Youtube](https://www.youtube.com/channel/UCE3lbQitBJQDbIlSzwtmL8g/) |  [Botu Davet Et](https://discord.com/oauth2/authorize?client_id=771359782358745088&scope=bot&permissions=8)`, true)
.setThumbnail(`${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
message.channel.send(istatistikler)
  
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['istatistik'],
  permLevel: 0
};

exports.help = {
  name: 'i',
  description: 'i',
  usage: 'i'
};