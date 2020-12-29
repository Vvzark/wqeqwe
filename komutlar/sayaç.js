const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
 
exports.run = async (client, message, args) => {
  let prefix = ayarlar.prefix
    if(!message.member.hasPermission("ADMINISTRATOR")) return;
   
   if(args[0] == "ayarla"){
  let kanal = message.mentions.channels.first();
 if(!args[2]){
 
    const yanlış = new Discord.MessageEmbed()
     .setAuthor("PekaBot", "https://cdn.discordapp.com/attachments/783305588632584202/783975503178366987/pekayenilogo.png")
      .setColor("#ff0000")
      .setDescription(`**Lütfen **\`${prefix}sayaç ayarla #kanal sayı\`** Şeklinde Belirtiniz.Eğer Sayıyı Belirtmezseniz Otomatik Olarak Bir Sayı Belirlenir**`)
      .setFooter("🔮 Tüm Hakları Saklıdır.")   
     if(!kanal) return message.channel.send(yanlış)
     
  let sayı = message.guild.memberCount + 100 
   db.set(`sayaç_${message.guild.id}.sayı`, sayı);
   db.set(`sayaç_${message.guild.id}.kanal`, kanal.id);
    const ikru = new Discord.MessageEmbed()
       .setColor("#3f007f")
     .setAuthor("PekaBot", "https://cdn.discordapp.com/attachments/783305588632584202/783975503178366987/pekayenilogo.png")
       .setDescription(`**Sayaç Kanalı \`${kanal.name}\` Olarak Ayarlandı Sayaç Sayısı İse \`${sayı}\` Olarak Otomatik Biçimde Ayarlandı**`)
       .setFooter(`🔮 Tüm Hakları Saklıdır.`)
      return message.channel.send(ikru) 
    } 
   db.set(`sayaç_${message.guild.id}.sayı`, args[2]);
   db.set(`sayaç_${message.guild.id}.kanal`, kanal.id);
    const ikrudka = new Discord.MessageEmbed()
       .setColor("#00ff51")
     .setAuthor("PekaBot", "https://cdn.discordapp.com/attachments/783305588632584202/783975503178366987/pekayenilogo.png")
       .setDescription(`**Sayaç Kanalı <#${kanal.id}> Olarak Ayarlandı.Belirlenen Hedef Üye Sayısı İse \`${args[2]}\` Olarak Ayarlandı.**`)
       .setFooter(`🔮 Tüm Hakları Saklıdır.`)
      return message.channel.send(ikrudka) 
     
   }
   if(args[0] == "sıfırla"){
     db.delete(`sayaç_${message.guild.id}`)
   const pekabot = new Discord.MessageEmbed()
    .setColor("#00ff51")
     .setAuthor("PekaBot", "https://cdn.discordapp.com/attachments/783305588632584202/783975503178366987/pekayenilogo.png")
    .setDescription(`> **Sayaç Başarıyla Sıfırlandı.**\n\nTekrar Kurmak İçin **\`${prefix}sayaç ayarla #kanal sayı\`**`)
    .setFooter(`🔮 Tüm Hakları Saklıdır.`)
    return message.channel.send(pekabot) 
   }  
     
     
     
  const yanlış = new Discord.MessageEmbed()
     .setAuthor("PekaBot", "https://cdn.discordapp.com/attachments/783305588632584202/783975503178366987/pekayenilogo.png")
   .setColor("#ff0000")
   .setDescription(`Lütfen **\`${prefix}sayaç ayarla - sıfırla\`**`)
   .setFooter("🔮 Tüm Hakları Saklıdır.")   
  if(!args[0]) return message.channel.send(yanlış)
   
  }

 
exports.conf = {
        enabled: true,
        guildOnly: true,
        aliases: ['sayac'],
        permLevel: 0
}
 
exports.help = {
        name: 'sayaç',
        description: 'Sayacı ayarlar.',
        usage: 'sayaç <sayı> <#kanal> / sıfırla'
}