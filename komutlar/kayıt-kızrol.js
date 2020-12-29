const discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

    if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(new discord.MessageEmbed().setColor('RED').setDescription(`<a:basarisiz:757851005483221022> Bu komutu kullanabilmek için "\`yönetici\`" yetkisine sahip olmalısın`));

if(args[0] === "sıfırla") {
const acebots = new discord.MessageEmbed()
.setColor('#00ff51')
.setDescription(`<a:basarili:757851040346538084> Sunucu İçin Ayarladığınız Kız Rolü Başarıyla Sıfırlandı !`)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(acebots)
db.delete(`kızrol_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const acebot = new discord.MessageEmbed()
.setColor('#ff0000')
.setDescription(`<a:basarisiz:757851005483221022> Ayarlayacağınız Kız Rolünü Belirtiniz ! `)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(acebot)
}
db.set(`kızrol_${message.guild.id}`, rol.id)
const ace = new discord.MessageEmbed()
.setColor('#00ff51')
.setDescription(`<a:basarili:757851040346538084> Kız Rolü Başarıyla ${rol} Olarak Ayarlandı ! `)
.setThumbnail(client.user.avatarURL)
.setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `)
message.channel.send(ace)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: [],
  permlevel: 0
}
exports.help = {
  name: 'kız-rol',
  description: 'Kayıt Olurken Verilecek Kız rolünü ayarlar',
  usage: '!kız-rol @rol'
}