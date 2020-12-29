const Discord = require('discord.js');

exports.run = (client, message) => {

  const PekaEmbed = new Discord.MessageEmbed()
  .setColor('#11ff00')
  .setDescription(`**Destek Sunucusu** [Tıkla](https://discord.gg/TGDNRDW) \n\n **Botun Davet Linki** [Tıkla](https://discord.com/oauth2/authorize?client_id=771359782358745088&scope=bot&permissions=8)\n\n **Youtube Kanalımız** [Tıkla](https://www.youtube.com/channel/UCE3lbQitBJQDbIlSzwtmL8g/)`)
  .setTimestamp()
  .setFooter("PekaBot Tüm Hakları Gizlidir", client.user.avatarURL);
  message.channel.send(PekaEmbed) 
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['destek-sunucusu'],
  permLevel: 0
};

exports.help = {
  name: 'davet',
  description: 'Botun Destek Sunucusunu Ve Discord Destek Sunucu Linkini Atar.',
  usage: 'davet'
};