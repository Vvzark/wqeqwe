const Discord = require('discord.js');
const db = require('quick.db')



exports.run = function(client, message, args) {

  let başvurulog = db.fetch(`başvurulog_${message.guild.id}`)

    let type = args.slice(0).join(' ');
  
    if (type.length < 1) return message.channel.send(
      
new Discord.MessageEmbed()
 .setColor("#ff0000")     
.setDescription('**__Hatalı Kullanım!__**\n\n:white_small_square: **__Doğru Kullanım__** \n **\`${prefix}başvuru <form>\`** \n \n :white_small_square: **__Log kanalını belirlemek için__** \n **log-kanal <#kanal>**'));
const embed =new Discord.MessageEmbed()
message.delete()
.setColor("#00ff51")

.setDescription('Başvurunuz Bildirildi!\n\n Yetkililer En Kısa Süre İçerisinde Dönüş Yapacaklardır...Anlayışınız İçin Yetkili Kadromuz Teşekkür Eder!')

message.channel.send(embed).then(msg => msg.delete({timeout: 5000}))
  message.delete()
const embed2 = new Discord.MessageEmbed()

.setColor("LİME")

.setDescription(`<@${message.author.id}> adlı kullanıcının **__Başvurusu__**:`)

.addField(`**Kulanıcı Bilgileri**`, `**__Kullanıcı ID:__** ${message.author.id}\n**__Kullanıcı Adı:__** ${message.author.username}\n**__Kullanıcı Tagı:__** ${message.author.discriminator}`)

.addField("Başvuru", type)

.setThumbnail(message.author.avatarURL)

 client.channels.cache.get(başvurulog).send(embed2);
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'başvuru',
  description: 'Şikayet de bulunursunuz..',
  usage: 'başvuru <form>'
}; 