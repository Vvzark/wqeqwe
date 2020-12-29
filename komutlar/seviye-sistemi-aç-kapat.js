const Discord = require('discord.js')
const db = require('quick.db')
const ayarlar = require('../ayarlar.json')
exports.run = (client,message,args) => {
let prefix = ayarlar.prefix
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send('Bu komutu kullanabilmek için `YÖNETİCİ` yetkisine sahip olmalısın!')


let boş = args.slice(0).join(' ')
if(!boş) return message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **Yanlış Kullanım** \n\n **\`${prefix}seviye-sistemi aç\`** - **\`${prefix}seviye-sistemi kapat\`**\n\n Lütfen Yukardakilerden Birini Belirterek Tekrar Deneyin!`)
.setColor("#ff0000"));


if(args[0] == "aç") {

db.set(`seviyesistemi_${message.guild.id}`, "açık")
message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **PekaBot Seviye Sistemi** \n\n Seviye Sistemi Başarıyla **\`Açıldı\`**!\n\n> **Tekrar**'dan **Kapatmak** İçin **\`${prefix}seviye-sistemi kapat\`** Yazabilirsiniz...`)
.setColor("GREEN"));

}


if(args[0] == "kapat") {
db.delete(`seviyesistemi_${message.guild.id}`)
message.channel.send(new Discord.MessageEmbed()
                    
.setDescription(`> **PekaBot Seviye Sistemi** \n\n Seviye Sistemi Başarıyla **\`Kapatıldı\`**!\n\n> **Tekrar**'dan  **Açmak** İçin **\`${prefix}seviye-sistemi aç\`** Yazabilirsiniz...`)
.setColor("GREEN"));
}


}

exports.conf = {
enabled: true,
guildOnly: false,
permLevel: 0,
aliases: []
}

exports.help = {
name: 'seviye-sistemi'
}