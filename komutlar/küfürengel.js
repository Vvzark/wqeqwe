const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (client, message, args) =>{
const code = message.mentions.channels.first() || message.channel
const ikrudka = args[0]
if (!ikrudka) return message.reply(`**Küfür engel sistemini açmak için \`.küfür-engel aç #kanal\` veya \`.küfür-sistemi aç\` yazmalsın!**`)
 
  if (ikrudka == 'aç') { 
  let açıkkapalı = await db.fetch(`pekabot_${code.id}`)
  if(açıkkapalı) return message.reply(`**Peka BOT | __Küfür Engel Sistemi Zaten Kanalda \`Aktif\`!__** `)
    
db.set(`pekabot_${code.id}`,'açık')
message.reply(`**Peka BOT | __Küfür Engel Sistemi Başarıyla \`Aktif\` Edildi!__** `)
  }
  
  if (ikrudka == 'kapat') {
  let açıkkapalı = await db.fetch(`pekabot_${code.id}`)
  if(!açıkkapalı) return message.reply(`**Peka BOT | __Zaten Küfür Engel Sistemi Kanalda \`Deaktif\`!__** `)

    
db.delete(`pekabot_${code.id}`)
message.reply(`**Peka BOT | __Küfür Engel Sistemi Başarıyla \`Deaktif\` Edildi!__** `)
}
};
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: ["küfür-engel","küfür-sistemi"],
  permLevel: 3
};

exports.help = {
  name: 'küfür-engel',
  description: 'Peka BOT',
  usage: 'küfür-engel'
}