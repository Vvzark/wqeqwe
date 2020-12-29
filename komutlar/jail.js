const discord = require('discord.js')
const Discord = require('discord.js')

const db = require('quick.db')

exports.run = async(client, message, args) => {
  
      let acebots = new discord.MessageEmbed().setColor('#f7ff4d').setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `).setTimestamp();


let jaillog = db.fetch(`jaillog_${message.guild.id}`)
let jailrol = db.fetch(`jailrol_${message.guild.id}`)
let jailci = db.fetch(`jailci_${message.guild.id}`)

if (!jailrol) return message.channel.send(acebots.setDescription(` Sunucuda Jail Rolü Ayarlanmadığı İçin Komut Kullanılamaz ! `))
if (!jailci) return message.channel.send(acebots.setDescription(`Sunucuda Jail Yetkili Rolü  Ayarlanmadığı İçin Komut Kullanılamaz ! `))
if(!jaillog) return message.channel.send(acebots.setDescription('Jail log sistemi ayarlanmamış.'))
if(!message.member.roles.cache.has(jailci)) return message.channel.send(acebots.setDescription(`Bu Komudu Kullanabilmen İçin <@&${jailci}> Adlı Role Sahip olman Lazım ! `))

  
  
let member = message.mentions.members.first();
if (!member) return message.channel.send(acebots.setDescription(`Jaile Atıcağın Kullanıcıyı Belirtmelisin ! `))


member.roles.cache.forEach(r => {
member.roles.add(jailrol);
member.roles.remove(r.id)

  
  db.set(`jaill_${member.id}` , 'var')})
 
  const acebot = acebots
.setDescription(` Jaile Atılan Kullanıcı: ${member} \n Jaile Atan Yetkili: <@!${message.author.id}>`) 
.setThumbnail( message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(acebot)

  let embed = acebots
    .setColor('GREEN')
    .setTitle('Kişi Jaile Atıldı')
    .addField('Yetkili', `${message.author.tag}`)
    .addField('Jaile Atılan kişi', member)
    client.channels.cache.get(jaillog)
  

}
exports.conf = {
  enabled: true,
  guildonly: false,
  aliases: ['jail'],
  permlevel: 0
}
exports.help = {
  name: 'cezalı',
  description: 'erkek olarak kayıt eder',
  usage: '!erkek @kullanıcı isim yaş'
}