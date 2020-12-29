const Discord = require("discord.js");
exports.run = async (client, message, args) => {

const pekabot = new Discord.MessageEmbed()
.setColor("BLUE")
.setThumbnail(`${message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 })}`)
.addField(`Ping Değerlerim` ,`${client.ws.ping}`)
  
return message.channel.send(pekabot)
  
  
}
  
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ping',
  description: 'Sade Ping Komutu işde mq',
  usage: 'ping'
}; 