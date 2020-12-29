const Discord = require('discord.js')
exports.run = (bot, message, args) =>
{
  let Discord = require('discord.js');
    let guild = message.guild;

  guild
    .fetchBans()
    .then(peka =>
     message.channel.send(new Discord.MessageEmbed()
                                              
.setDescription(`Banlanlan Kullanıcı Sayısı ${peka.size}!`)
.setColor("#ff0000"))
    )
    .catch(console.error);
    var userlist = message.guild.fetchBans();
   userlist.then(collection =>
   {
     if(collection.first() == null)
     {
       const embed = new Discord.MessageEmbed()
       .setTitle(`:no_entry_sign: Banlanan Kullanıcı bulunamadı :no_entry_sign:`)
       .setColor("RED");
       message.channel.send({embed});
     }
     else
     {
       const embed = new Discord.MessageEmbed()
       .setTitle("🚫 Banlistesi | Sunucudan Banlananlar")
       .setColor("RED");
       for(userlist of collection)
       {
           var user = userlist[1];
           embed.addField(` **${user.tag}**`, `_________ _____________`);
       }
       message.channel.send({embed});
     }
   });
 }
module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["banlılar","banliste"],
  permLevel: 0
};
module.exports.help = {
  name: 'banlananlar',
  description: 'Sunucundan Banlanan üyeleri gösterir.',
  usage: 'banlananlar'
};