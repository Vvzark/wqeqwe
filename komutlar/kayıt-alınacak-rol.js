const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new Discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`));

if(args[0] === "sıfırla") {
const acebots = new discord.MessageEmbed()
.setColor('#00ff51')
.setDescription(`<a:basarili:757851040346538084> Kayıt Olunca Alınacak Rol Sıfırlandı ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(acebots)
db.delete(`alınacakrol_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const acebot = new discord.MessageEmbed()
.setColor('#ff0000')
.setDescription(`<a:basarisiz:757851005483221022> Kayıt Olunca Alınacak Rolü Belirtiniz ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(acebot)
}
db.set(`alınacakrol_${message.guild.id}`, rol.id)
const acebotss = new discord.MessageEmbed()
.setColor('#00ff51')
.setDescription(`<a:basarili:757851040346538084> Kayıt Olunca Otomatik Alınacak Rol Başarıyla ${rol} Olarak Ayarlandı ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(acebotss)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'alınacak-rol',
  description: 'Alınacak Rolü Belirtirsiniz',
  usage: '!alınacak-rol @rol'
}