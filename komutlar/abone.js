const Discord = require("discord.js");
const db = require('quick.db')
const ayarlar = require('../ayarlar.json');


exports.run = async (client, message, args, guild) => {//acebots
    
    let d = ayarlar.prefix
    let abone = ayarlar.abonerol
    let abone2 = ayarlar.abone2
    let kayıtsayı = db.fetch(`kayıtsayı_${message.author.id}`)
    let sohbet = ayarlar.sohbetkanal
    let galeri = ayarlar.galeri

    if(message.channel.id !== (galeri))//acebots
  return message.channel.send(new Discord.MessageEmbed().setColor("#ff0000").setDescription(`Bu Komudu Sadece **<#${galeri}>** Adlı Kanalda Kullanabilirsin ! `)).setColor('#ff0000')



  
  let acebots = new Discord.MessageEmbed()
//acebots
let member = message.mentions.members.first();
  if (!member) return message.channel.send(new Discord.MessageEmbed().setColor('#ff0000').setDescription(`Abone Vericeğin Kullanıcıyı Belirtmelisin! \n\n **Örnek Kullanım:** ${d}abone @kullanıcı `))


   member.roles.add(abone) 
   member.roles.add(abone2) //acebots 
//acebots
  //acebots
const qmicik = new Discord.MessageEmbed()
  .setDescription(`${member.user} Adlı Üyeye <@&${abone}> Ve <@&${abone2}> Rollerini Verdim.`)
  .setFooter(`Abone Verdiğin Toplam Kullanıcı Sayısı: ${kayıtsayı ? `${kayıtsayı}` : "0"}`, message.author.avatarURL({ dynamic: true, format: 'png', size: 1024 }))
  .setColor('#b2fae6')
db.add(`kayıtsayı_${message.author.id}`, 1) //acebots 
message.channel.send(qmicik)
  //acebots
const qmi = new Discord.MessageEmbed()
   .setDescription(`<@${member.id}> **Adlı Üye Abone Oldu.Aramıza Hoşgeldin!**`).setColor('#0e3bfa')
   client.channels.cache.get(sohbet).send(qmi)}; //acebots 
//acebots
exports.conf = {
enabled: true,
guildOnly: true,
aliases: ['abone'],
permLevel: 0
};
exports.help = {
name: "abone",
description: "Abone Rolü Verir", //acebots 
usage: "prefix!erkek"
};