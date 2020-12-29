const Discord = require('discord.js');
const db = require('quick.db');
const ayarlar = require("../ayarlar.json");


exports.run = async(client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) 
return message.channel.send(`Bu Komutu Kullanabilmek İçin "\`Yönetici\`" Yetkisine Sahip Olmalısın.`);
  let acebot = new Discord.MessageEmbed().setColor('#70ff70').setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `).setTimestamp();
  let user = message.mentions.users.first()
    let prefix = ayarlar.prefix
    let sebep = args.slice(1).join(' ') || "Belirtilmemiş."
    if(!user) return message.channel.send(acebot.setDescription(`**> Hatalı Kullanım...**\n> **Bir kişi etiketlemelisin!**\n > Örnek Kullanım: **\`${prefix}ban @kullanıcı <sebep>\`**`))
    if(user.id === message.author.id) return message.channel.send(acebot.setDescription('Kendini banlayamazsın.'))
    if(user.id === client.user.id) return message.channel.send(acebot.setDescription('Botu banlayamazsın.'))
    if(user.id === message.guild.ownerID) return message.channel.send(acebot.setDescription ('Sunucu sahibini banlayamazsın.'))
    if (!message.guild.member(user).bannable) return message.channel.send(acebot.setDescription(' Bu kişinin rolü senden üstte veya `Üyeleri yasakla` yetkisine sahip.'));



   message.guild.members.cache.get(user.id).ban({reason: `${sebep}`})
      let embed = acebot.setDescription(`${user} adlı kullanıcı ${message.author.tag} tarafından \`${sebep}\` sebebi ile banlandı. `)

};
 

 
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases:[],
  permlevel: 0
};

exports.help = {
  name: "ban"
}
