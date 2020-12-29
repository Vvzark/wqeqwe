const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require("../ayarlar.json");

exports.run = async(client, message, args) => {
 if (!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(':no_entry: Bu komudu kullanabilmek için `Sunucuyu Yönet` yetkisine sahip olmalısın!')
let prefix = ayarlar.prefix
   

if (args[0] === 'sıfırla') {
  let isim = db.fetch(`otoisim_${message.guild.id}`)
  if (!isim) return message.channel.send(`Öncelikle Oto İsimi Ayarlamalısın!!`)
  message.channel.send(`Oto-İsim Sıfırlandı!`)
  db.delete(`otoisim_${message.guild.id}`)
  return;
}

let isim = args.slice(0).join(' ')
if (!isim) return message.channel.send(new Discord.MessageEmbed()
  .setColor("#ff0000")                   
.setDescription(`> **__Hatalı Kullanım...__**\n\n **Lütfen Öncelikle Bir İsim Belirleyiniz**\n\n Örnek Kullanım: **\`${prefix}oto-isim İsim | Yaş\`**\n\n **Komutu Kullanan Kullanıcı:** <@${message.author.id}>`))

db.set(`otoisim_${message.guild.id}`, isim)
message.channel.send(new Discord.MessageEmbed()
  .setColor("#00ff1a")                   
.setDescription(`**__Oto İsim Başarıyla Ayarlandı!__**\n\n Oto İsim, **\`${isim}\`** Olarak **Ayarlandı! **\n\n **Oto İsimi Ayarlayan Yetkili:** <@${message.author.id}>`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })))

}
exports.conf = {
  name: true,
  guildonly: false,
  aliases: ['oto-isim'],
  permlevel: 0
}
exports.help = {
  name: 'otoisim'
}



