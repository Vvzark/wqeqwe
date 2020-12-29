const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async(client, message, args) => {

    let acebots = new Discord.MessageEmbed().setColor('RANDOM').setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `).setTimestamp();

  
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(acebots.setDesciption(`Bu komutu kullanabilmek için "\`Yönetici\`" yetkisine sahip olmalısın`));

if(args[0] === "sıfırla") {
const ace = acebots
.setDescription(`Sunucu İçin Ayarladığınız Jail Rolü Başarıyla Sıfırlandı!`)
message.channel.send(ace)
db.delete(`jailrol_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const aceb = acebots
.setDescription(`Ayarlayacağınız Jail Rolünü Belirtmeyi Unuttunuz! `)
message.channel.send(aceb)
}
  
  
db.set(`jailrol_${message.guild.id}`, rol.id)
const acebo = acebots
.setDescription(`Jail Rolü Başarıyla ${rol} Olarak Ayarlandı!`)
message.channel.send(acebo)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['cezalı-rol', 'jrol', 'j-rol'],
  permlevel: 0
}
exports.help = {
  name: 'jail-rol',
  description: 'Cezalı Rolünü Ayarlarsınız',
  usage: '!jail-rol @rol'
}