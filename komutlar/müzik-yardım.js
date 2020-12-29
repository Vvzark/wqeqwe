const Discord = require('discord.js')
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix
let user = message
const yardım = new Discord.MessageEmbed()
.setColor("#3a00fe")
.setAuthor(`Yardım Menüsü | GELİŞTİRME AŞAMASINDA`)
.setDescription(
    `
\`${prefix}oynat <şarkı-adı>\` : **Bir Şarkıyı Oynatır.**
\`${prefix}atla\` : **Sıradaki Şarkıyı atlar.**
\`${prefix}döngü\` : **O Anki şarkıyı Hep tekrarlar.**
\`${prefix}durdur\` : **O anki Şarkıyı Durdurur.**
\`${prefix}devam\` : **Duran Şarkıyı Devam Ettirir.**
\`${prefix}sıra\` : **O Anki Sırayı Gösterir.**
\`${prefix}np\` : **O Anki Oynatılan Şarkıyı Söyler.**
`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
.setTimestamp()
.setFooter(`${user.author.username} Tarafından İstendi!`, user.author.avatarURL())
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: 1,
  guildOnly: 1, 
  aliases: ['mhelp','m-help','müzik-yardım'], 
  permLevel: 0
};

exports.help = {
  name: "m-yardım",
  description: 'Yardım Menüsü.',
  usage: 'myardım'
};