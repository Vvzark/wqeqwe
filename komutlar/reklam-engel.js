const db = require("quick.db");
const Discord = require("discord.js");
const ayarlar = require("../ayarlar.json");
let prefix = ayarlar.prefix;

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("BAN_MEMBERS")) {

const pekabot = new Discord.MessageEmbed()

      .setDescription(`*Hata!** | PekaBot - Reklam Engel \n\nNe Yazıkki Bu Komutu Kullanmaya Yetkin Yok!\n\n  Gereken Yetki:**\`BAN_MEMBERS\`**`)
      .setColor("#ff0000");

message.channel.send(pekabot);
    return;
  }
  if (!args[0]) {

const peka = new Discord.MessageEmbed()

      .setColor("#ff0000")
      .setTitle("Peka Bot | Reklam-Engel Sistemi!")
      .setDescription(`Hatalı Kullanım!\n\n Örnek: **\`${prefix}reklam-engel aç & kapat\`**`);

return message.channel.send(peka);

    return;
  }
let kufur = await db.fetch(`kufur_${message.guild.id}`);
if (args[0] == "aç") {
if (kufur) {

const ikrudka = new Discord.MessageEmbed()

        .setColor("#ff0000")
        .setTitle("Peka Bot | Reklam-Engel Sistemi!")
        .setDescription("**Görünüşe Göre Reklam-Engel Sistemi Zaten Aktif!**");

return message.channel.send(ikrudka);

      return;
    } else {
      db.set(`kufur_${message.guild.id}`, "Açık");

const ace = new Discord.MessageEmbed()

        .setColor("#00ff51")
        .setTitle("Peka Bot | Reklam-Engel Sistemi!")
        .setDescription("Reklam-Engel Sistemi Başarıyla Açıldı!");

return message.channel.send(ace);

    }
  } else if (args[0] == "kapat") {
    db.delete(`kufur_${message.guild.id}`);

const AsD = new Discord.MessageEmbed()

      .setColor("#00ff51")
      .setTitle("Peka Bot | Reklam-Engel Sistemi!")
      .setDescription("Reklam-Engel Sistemi Başarıyla Kapandı!");

return message.channel.send(AsD);
    
    
    
    

    
  }
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["reklamengel"],
  permLevel: 2
};

exports.help = {
  name: "reklam-engel",
  description: "Bot Sunucudaki Reklamları Engeller.",
  usage: "reklam-engel"
};