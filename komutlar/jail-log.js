const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
  let acebots = new Discord.MessageEmbed().setColor('#70ff70').setFooter(`Komut ${message.author.tag} Tarafından Kullanıldı ! `).setTimestamp();
  
   if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(acebots.setDescription('Bu komutu kullanabilmek için `Yönetici` yetkisine sahip olmalısın!'))

   	let kanal = message.mentions.channels.first()
    if(!kanal) return message.channel.send(acebots.setDescription('Jail log kanalını belirtmelisin!'))
    db.set(`jaillog_${message.guild.id}`, kanal.id)
    return message.channel.send(acebots.setDescription(`Jail log kanalı <#${kanal.id}> Olarak ayarlandı!`))
  
 }

exports.conf = {
	enabled: true,
	guildOnly: false,
	aliases:[],
	permlevel: 0
};

exports.help = {
	name: "jail-log"
}