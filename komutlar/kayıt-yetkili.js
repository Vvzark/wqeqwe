const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {

  if (!message.member.hasPermission("ADMINISTRATOR")) 
  return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`<a:basarisiz:757851005483221022>  Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`));

if(args[0] === "sıfırla") {
const AceBots = new discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`<a:basarili:757851040346538084> Sunucu İçin Ayarladığınız Kayıt Yetkili Rolü Başarıyla Sıfırlandı ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(AceBots)
db.delete(`kayıtçırol_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const AceBot = new discord.MessageEmbed()
.setColor('RED')
.setDescription(`<a:basarisiz:757851005483221022> Ayarlayacağınız Kayıt Yetkili Rolünü Belirtiniz ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(AceBot)
}
db.set(`kayıtçırol_${message.guild.id}`, rol.id)
const Ace = new discord.MessageEmbed()
.setColor('GREEN')
.setDescription(`<a:basarili:757851040346538084> Kayıt Yetkili Rol, Başarıyla ${rol} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(Ace)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'kayıt-yetkili',
  description: 'Kayıt Yetkili Rolünü Ayarlar',
  usage: '!kayıt-yetkili @rol'
}