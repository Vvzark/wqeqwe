const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {
  
      let acebots = new discord.MessageEmbed().setColor('RANDOM').setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `).setTimestamp();


  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(acebots.setDescription(`> <${message.author.id}> Bu Komutu Kullanabilmek İçin "\`Yönetici\`" Yetkisine Sahip Olmalısın!`));

if(args[0] === "sıfırla") {
const acebot = acebots
.setDescription(`Sunucu İçin Ayarladığınız Jail Yetkilisi Rolü Başarıyla Sıfırlandı ! `)
message.channel.send(acebot)
db.delete(`jailci_${message.guild.id}`)
return;
}

let rol = message.mentions.roles.first();   
if (!rol) {
  const ace = acebots
.setDescription(`Ayarlayacağınız Jail Yetkilisi Rolünü Belirtmeyi Unuttunuz!`)
message.channel.send(ace)
}
  
  
db.set(`jailci_${message.guild.id}`, rol.id)
const aceb = acebots
.setDescription(`Jail Yetkili Rolünü Başarıyla ${rol} Olarak Ayarlandı ! `)
message.channel.send(aceb)
  
}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['jailcirol', 'jail-yetkili'],
  permlevel: 0
}
exports.help = {
  name: 'jail-yetkili-rol',
  description: 'Jail Komudunu Kullanmak İçin Yetkili Rolü Ayarlarsınız',
  usage: 'jail-yetkili-rol @rol'
}