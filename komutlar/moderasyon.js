const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json')
exports.run = function(client, message) {
  
  let prefix  = ayarlar.prefix

const yardım = new Discord.MessageEmbed()
.setColor("RANDOM")
.setAuthor(`PekaBOT Yardım Menüsü | GELİŞTİRME AŞAMASINDA`)
.setDescription(`
:white_small_square:  \`${prefix}ban\` \n **Banlamak İstediğiniz Kişinin İD 'sini Belirterek Kişiyi Sunucudan Yasaklamanıza Yarar...**\n
:white_small_square:  \`${prefix}bansay\` \n **Kullanığı Zaman Sunucudaki Yasaklanan Üye Sayısını Gösterir.**\n
:white_small_square:  \`${prefix}başvuru - talep - şikayet\` \n **Belirlenen Log Kanalına Kullanıcının Talebini - Şikayetini - Başvurusunu Gönderir.**\n
:white_small_square:  \`${prefix}davet\` \n **Bot Ve Yapımcılar Hakkındaki Bağlantıları Gönderir.**\n
:white_small_square:  \`${prefix}istatistik\` \n **Bot Hakkında İstatistikleri Gösterir.**\n
:white_small_square:  \`${prefix}fake-hesap\` \n **Fake Hesap Sistemi Aktif Edildiğinde, Sunucunuzu Fake(Sahte) Olan Hesaplardan, Kullanıcılardan Korur.**\n
:white_small_square:  \`${prefix}küfür-engel aç - kapat\` \n **Etiketlenen Yada Kullanılan Kanalda Küfür Engel Sistemini Açar.**\n
:white_small_square:  \`${prefix}reklam-engel aç - kapat\` \n **Etiketlenen Yada Kullanan Kanalda Reklam Engel'i Açar.**\n
:white_small_square:  \`${prefix}sil\` \n **Kullanılan Kanalda Belirtilen Sayı Kadar Mesaj Siler.**\n
[**Youtube**](https://www.youtube.com/channel/UCE3lbQitBJQDbIlSzwtmL8g/)    **|**    [**Discord**](https://discord.gg/TGDNRDW)     **|**     [**Bot Davet**](https://discord.com/oauth2/authorize?client_id=771359782358745088&scope=bot&permissions=8)
`)
//.addField(``,``,true)

.setTimestamp()
.setFooter(`${message.author.username} Tarafından İstendi! | Kullanıcı İD - ${message.author.id}`)
.setThumbnail(message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
message.channel.send(yardım)

  
   
  
};

exports.conf = {
  enabled: true,
  guildOnly: false, 
  aliases: ['mod-help','moderasyon'], 
  permLevel: 0
};

exports.help = {
  name: "mod-yardım",
  description: 'Yardım Menüsü.',
  usage: 'mod-yardım'
};