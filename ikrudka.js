const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');

const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + "7/24 AKTİF TUTMA İŞLEMİ BAŞARILI");
  response.sendStatus(200);
});
app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};
let komutum2 = JSON.parse(fs.readFileSync("./otocevap.json", "utf8"));

client.cmddd = komutum2

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);

//---------------------------------KOMUTLAR---------------------------------\\



client.on("messageUpdate", async (oldMsg, newMsg) => {
let wictor = await db.fetch(`pekabot_${oldMsg.channel.id}`)
if (!wictor) return 
if(!newMsg.guild) return;
let küfürler = require('./küfürler.json')
let kelimeler = newMsg.content.slice(" ").split(/ +/g)
if(küfürler.some(kufur => kelimeler.some(kelime => kelime === kufur))) {
if (newMsg.member.hasPermission("MANAGE_MESSAGES")) return;
newMsg.delete()
oldMsg.reply('Bi sen zekisin!').then(msg => msg.delete(5000)) 
}
});
client.on("message", async message => {

  let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
  let reklamkick = await db.fetch(`kufur_${message.guild.id}`);
  let kullanici = message.member;
  if (!reklamkick) return;
  if (reklamkick == "Açık") {
    const reklam = [
      "discord.app",
      "discord.gg",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".pw",
      ".io",
      ".me",
      ".gg",
      "www.",
      "https",
      "http",
      ".gl",
      ".org",
      ".com.tr",
      ".biz",
      ".party",
      ".rf.gd",
      ".az",
      "youtube/",
      "twitch/",
      "html"
    ];
    if (reklam.some(word => message.content.toLowerCase().includes(word))) {
      if (!message.member.hasPermission("BAN_MEMBERS")) {
        message.delete();
        db.add(`reklamuyari_${message.author.id}`, 1); //uyarı puanı ekleme
        if (uyarisayisi === null) {
          let ikrudka = new Discord.MessageEmbed()
            .setColor("#00ff66")
            .setTitle("Peka Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İlk Uyarın! (1/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
         return message.channel.send(ikrudka);
        }
        if (uyarisayisi === 1) {
          let ikrudka = new Discord.MessageEmbed()
            .setColor("#00fff0")
            .setTitle("Peka Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yapmayı Kes! Bu İkinci Uyarın! (2/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
        return message.channel.send(ikrudka);
        }
        if (uyarisayisi === 2) {
          message.delete();
          await kullanici.kick({
            reason: `Reklam-Engel Sistemi!`
          });
          let ikrudka = new Discord.MessageEmbed()
            .setColor("#0054ff")
            .setTitle("Peka Reklam-Engel!")
            .setDescription(
              `<@${message.author.id}> Reklam Yaptığı İçin Sunucudan Atıldı! (3/3)`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
         return message.channel.send(ikrudka);
        }
        if (uyarisayisi === 3) {
          message.delete();
          await kullanici.ban({
            reason: `Peka Reklam-Engel Sistemi!`
          });
          db.delete(`reklamuyari_${message.author.id}`);
          let ikrudka = new Discord.MessageEmbed()
            .setColor("#000000")
            .setTitle("PekaBOT | Reklam Kick Sistemi")
            .setDescription(
              `<@${message.author.id}> Atıldıktan Sonra Tekrar Reklam Yaptığı İçin Sunucudan Yasaklandı!`
            )
            .setFooter(client.user.username, client.user.avatarURL)
            .setTimestamp();
         return message.channel.send(ikrudka);}}}}});
//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
const botadi = "PekaBot Bot Sizin Destekleriniz İle Gelişmektedir <3"

  client.on('guildBanAdd', async (guild, user) => {
          let entry = await guild.fetchAuditLogs({type: 'BAN_ADD'}).then(audit => audit.entries.first())
    let yetkili = client.users.cache.get(entry.executor.id)


  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#080000")
    .setAuthor("Yasaklanan Kullanıcı Bilgileri")
    .addField(`Yasaklanan Kullanıcı:`, `\`\` ${user.tag} \`\` `,true)
    .addField(`Yasaklanan Kullanıcı İdsi:`, `\`\` ${user.id} \`\` `,true)
 .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Yasaklayan Kullanıcı Bilgileri__**`)

    .addField(`Kullanıcı: `, `<@${yetkili.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${yetkili.id}\`\` `,true) 
     .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Uyarı__**`)
        .addField(`Yasaklanan Kullanıcının Banını Kaldırmak İçin Alttaki Metni Kopyalaıp Yapıştırınız: `, `\`\`${prefix}unban ${user.id} \`\` `)


    
    .setFooter(`${botadi}`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

  client.on('guildBanRemove', async (guild, user) => {
          let entry = await guild.fetchAuditLogs({type: 'BAN_REMOVE'}).then(audit => audit.entries.first())
    let yetkili = client.users.cache.get(entry.executor.id)


  let modlogs = db.get(`modlogkanaly_${guild.id}`)
  const modlogkanal = guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#080000")
    .setAuthor("Yasağı Kaldırılan Kullanıcı Bilgileri")
    .addField(`Kullanıcı:`, `\`\` ${user.tag} \`\` `,true)
    .addField(`Kullanıcı İdsi:`, `\`\` ${user.id} \`\` `,true)
 .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Yasaklamayı Kaldıran Kullanıcı Bilgileri__**`)

    .addField(`Kullanıcı: `, `<@${yetkili.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${yetkili.id}\`\` `,true) 



    
    .setFooter(`${botadi}`)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});



client.on('channelCreate', async channel => {
 let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
 let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_CREATE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
      let embed = new Discord.MessageEmbed()
      .setColor("#fffa00")
      .setAuthor("Oluşturulan Metin Kanalı Bilgileri")
      .addField(`Kanalın İsmi: `, ` \`\`${channel.name}\`\` `, true )
      .addField(`Kanal: `, ` <#${channel.id}>`, true )
  .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

    .addField(`Kullanıcı: `, `<@${user.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${user.id}\`\` `,true) 

      .setFooter(`${botadi} `)

      .setTimestamp()
      modlogkanal.send(embed)
    }
      if (channel.type === "voice") {
      
        let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setAuthor("Oluşturulan Ses Kanalı Bilgileri")
   .addField(`Kanalın İsmi: `, ` \`\`${channel.name}\`\` `, true )
      .addField(`Kanal İdsi: `, ` <#${channel.id}>`, true )
        .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

    .addField(`Kullanıcı: `, `<@${user.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${user.id}\`\` `,true) 

        .setFooter(`${botadi} `)
        .setTimestamp()
        modlogkanal.send(embed)


    }
}});

client.on('channelDelete', async channel => {
      let entry = await channel.guild.fetchAuditLogs({type: 'CHANNEL_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
 let modlogs = db.get(`modlogkanaly_${channel.guild.id}`)
  const modlogkanal = channel.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    if (channel.type === "text") {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Silinen Metin Kanalı Bilgileri")
    .addField(`Kanalın İsmi: `, ` \`\`${channel.name}\`\` `,true)
          .addField(`Kanalın İdsi: `, ` \`\`${channel.id}\`\` `,true)

  .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

        .addField(`Kullanıcı: `, `<@${user.id}>`, true)
          .addField(`Kullanıcı İdsi: `, ` \`\`${user.id}\`\` `, true)

      .setFooter(`${botadi} `)

    .setTimestamp()
    modlogkanal.send(embed)
  }
      if (channel.type === "voice") {

        let embed = new Discord.MessageEmbed()
        .setColor("#fffa00")
        .setAuthor("Silinen Ses Kanalı Bilgileri")
        .addField(`Kanalın İsmi: `, ` \`\`${channel.name}\`\` `,true)
                .addField(`Kanalın İdsi: `, ` \`\`${channel.id}\`\` `,true)

  .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

        .addField(`Kullanıcı: `, `<@${user.id}>`, true)
              .addField(`Kullanıcı İdsi: `, ` \`\`${user.id}\`\` `, true)

      .setFooter(`${botadi} `)

        .setTimestamp()
        modlogkanal.send(embed)
       }
      }
    });

client.on('roleDelete', async role => {
 let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
  let entry = await role.guild.fetchAuditLogs({type: 'ROLE_DELETE'}).then(audit => audit.entries.first())
  let user = client.users.cache.get(entry.executor.id)
 const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Silinen Rol Bilgileri")
    .addField(`Rolün İsmi : `, ` \`\`${role.name}\`\` `,true)
        .addField(`Rolün İdsi : `, ` \`\`${role.id}\`\` `,true)
   .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

    .addField(`Kullanıcı: `, `<@${user.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${user.id}\`\` `,true) 

      .setFooter(`${botadi} `)

    .setTimestamp()
    modlogkanal.send(embed)
  }
});

client.on('emojiDelete', async emoji => {
 let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
 let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_DELETE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Silinen Emoji Bilgileri")
    .addField(`Emojinin İsmi: `, ` \`\`${emoji.name}\`\` `,true)
        .addField(`Emojinin İdsi: `, ` \`\`${emoji.id}\`\` `,true)

.addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

    .addField(`Kullanıcı: `, `<@${user.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${user.id}\`\` `,true) 
      .setFooter(`${botadi} `)

    .setTimestamp()
    modlogkanal.send(embed)
  }
});
  

client.on('roleCreate', async role => {
let modlogs =  db.get(`modlogkanaly_${role.guild.id}`)
let entry = await role.guild.fetchAuditLogs({type: 'ROLE_CREATE'}).then(audit => audit.entries.first())
let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = role.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Oluşturulan Rol Bilgileri")
    .addField(`Rolün İsmi: `, ` \`\`${role.name}\`\` `,true)
        .addField(`Rolün İdsi: `, ` \`\`${role.id}\`\` `,true)

.addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

    .addField(`Kullanıcı: `, `<@${user.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${user.id}\`\` `,true)    
    .setFooter(`${botadi} `)
    .setTimestamp()

    modlogkanal.send(embed)
  }
});


client.on('emojiCreate', async emoji => {
 let modlogs = db.get(`modlogkanaly_${emoji.guild.id}`)
 let entry = await emoji.guild.fetchAuditLogs({type: 'EMOJI_CREATE'}).then(audit => audit.entries.first())
 let user = client.users.cache.get(entry.executor.id)
  const modlogkanal = emoji.guild.channels.cache.find(kanal => kanal.id === modlogs);
  if(!modlogs) return;
  if(modlogs) {
    let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor("Oluşturulan Emoji Bilgileri")
    .addField(`Emojinin İsmi: `, ` \`\`${emoji.name}\`\` `,true)
        .addField(`Emojinin İdsi: `, ` \`\`${emoji.id}\`\` `,true)

      
.addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)
   .addField(`Kullanıcı: `, `<@${user.id}>`,true)
   .addField("Kullanıcı İdsi:", ` \`\`${user.id}\`\` `,true)

      .setFooter(`${botadi} `)
    .setTimestamp()
    modlogkanal.send(embed)
  }
});

//MESAJ LOG

client.on("messageUpdate", async (oldMessage, newMessage) => {
  if (newMessage.author.bot || newMessage.channel.type === "dm") return;
  if (newMessage.content.startsWith(prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${newMessage.guild.id}`);
  let scbul = newMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  if (oldMessage.content == newMessage.content) return;
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Düzenlenen Mesaj Bilgileri`, newMessage.author.avatarURL)
    .addField("Eski Mesaj", ` ${ "``" + oldMessage.content + "``" } `, true)
    .addField("Yeni Mesaj",` ${"``" + newMessage.content + "``"}  `, true )
    .addField("Mesaj ID",` \`\`${newMessage.id}\`\`  `,true)

      .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kanal Bilgileri__**`)
  
  .addField("Kanal Adı",`\`\`${newMessage.channel.name}\`\``,true)
    .addField("Kanal İdsi",`\`\`${newMessage.channel.id}\`\``,true)

        .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__**`)

      .addField("Kullanıcı", `${newMessage.author}`,true)
        .addField("Kullanıcı İdsi",`\`\`${newMessage.author.id}\`\``,true)


  
      .setFooter(`${botadi} `)
    .setTimestamp()

  scbul.send(embed);
});

client.on("messageDelete", async deletedMessage => {
  if (deletedMessage.author.bot || deletedMessage.channel.type === "dm") return;
  if (deletedMessage.content.startsWith(prefix)) return;
  let sc = await db.fetch(`modlogkanaly_${deletedMessage.guild.id}`);
  let scbul = deletedMessage.guild.channels.cache.get(sc)
  if(!scbul) {
    
  }
  let embed = new Discord.MessageEmbed()
    .setColor("#fffa00")
    .setAuthor(`Silinen Mesaj Bilgileri`, deletedMessage.author.avatarURL)
    .addField("Silinen Mesaj:",` ${"``" + deletedMessage.content + "``"}`,true)
      .addField("Silinen Mesaj İd:", ` ${"``" + deletedMessage.id + "``"} `,true)
    .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kanal Bilgileri__** `)

    .addField("Kanal Adı:", ` \`\`${deletedMessage.channel.name}\`\` `, true)
      .addField("Kanal İdsi:", `\`\`${deletedMessage.channel.id}\`\` `, true)
    .addField(`▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬`,`**__Kullanıcı Bilgileri__** `)

    .addField("Kullanıcı:", ` ${ deletedMessage.author} `,true)
      .addField("Kullanıcı İd:", ` \`\`${deletedMessage.author.id}\`\` `,true)

  
      .setFooter(`${botadi} `)
    .setTimestamp()
  scbul.send(embed);
});

//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//
//-------------------- Mod Log Sistemi --------------------//


//-------------------- Capslock Engel Sistemi --------------------//
    client.on("message", async msg => {
    if (msg.channel.type === "dm") return;
      if(msg.author.bot) return;  
        if (msg.content.length > 4) {
         if (db.fetch(`capslock_${msg.guild.id}`)) {
           let caps = msg.content.toUpperCase()
           if (msg.content == caps) {
             if (!msg.member.hasPermission("ADMINISTRATOR")) {
               if (!msg.mentions.users.first()) {
                 msg.delete()
                 return msg.channel.send(`✋ ${msg.author}, Bu sunucuda, büyük harf kullanımı engellenmekte!`).then(m => m.delete(5000))
     }
       }
     }
   }
  }
});
//-------------------- Capslock Engel Sistemi --------------------//


//-------------------- Afk Sistemi --------------------//
const ms = require("parse-ms");
const { DiscordAPIError } = require("discord.js");

client.on("message", async message => {

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);

    const embed = new Discord.MessageEmbed()

      .setColor("GREEN")
      .setAuthor(message.author.username, message.author.avatarURL)
      .setDescription(`${message.author.username} Artık \`AFK\` Değilsin.`);

    message.channel.send(embed);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let süre = await db.fetch(`afk_süre_${USER.id}`);
    let timeObj = ms(Date.now() - süre);

    const afk = new Discord.MessageEmbed()

      .setColor("#ff0000")
      .setDescription(
        `**BU KULLANICI AFK**\n\n**Afk Olan Kullanıcı :** ${USER.tag}\n**Afk Süresi :** \`${timeObj.hours}saat\` \`${timeObj.minutes}dakika\` \`${timeObj.seconds}saniye\`\n**Sebep :** \`${REASON}\``
      );

    message.channel.send(afk);
  }
});
//-------------------- Afk Sistemi --------------------//

client.on("guildMemberAdd", async member => {
  let isim = db.fetch(`otoisim_${member.guild.id}`)
if (!isim) return;
member.setNickname(isim)
})
///////////////////////////////////////////////////////////
//-----------------Etiket Prefix-----------------\\



client.on('message', async msg => {
  let prefix = ayarlar.prefix
  await db.fetch(`prefix.${msg.guild.id}`) 
  if(msg.content == `<@!771359782358745088>`) return msg.channel.send(`> **Prefixim**\n\n>  **Sanırım beni etiketlediniz.**\n >  prefix(ön ek)im \`${prefix}\``);
});



//----------------------Otorol-------------------------\\
client.on("guildMemberAdd", member => {
  let rol = db.fetch(`autoRole_${member.guild.id}`);
if (!rol) return;
  let kanal = db.fetch(`autoRoleChannel_${member.guild.id}`);
  if (!kanal) return;

  member.roles.add(member.guild.roles.cache.get(rol));
  let embed = new Discord.MessageEmbed()
    .setDescription(`> **Sunucuya yeni katılan** ** <@${member.user.id}> ** **Kullanıcısına** <@&` +rol +`> **Rolü verildi.**`)
    .setColor("#00ff51"); 
  member.guild.channels.cache.get(kanal).send(embed);

});
//----------------------Otorol-------------------------\\

//////////////////////////////destek/////////////////////////////////////////////

client.on('messageReactionAdd', async (reaction, user) => {
  let message = reaction.message
  let supportRole = await db.fetch(`ticketSystem_${message.guild.id}.role`);
  let messageID = await db.fetch(`ticketSystem_${message.guild.id}.message`);
 
  if(message.id !== messageID) return;
    await reaction.users.remove(user.id);
  if(db.get(`ticketSystem_${message.guild.id}.ticketRequest.${user.id}`)) return
  if(!message.guild.channels.cache.filter(s => s.type == 'category').find(s => s.name == "biletler")){
    await message.guild.channels.create("biletler", {type: 'category'});
  } 
  let category = await message.guild.channels.cache.filter(s => s.type == 'category').find(s => s.name == "biletler")
 

  message.guild.channels.create(`bilet-${user.discriminator}`, {type: 'text', parent: category.id}).then(async(channel) => {
   
   channel.createOverwrite(message.guild.id, { VIEW_CHANNEL: false })
   channel.createOverwrite(user, { VIEW_CHANNEL: true, SEND_MESSAGES: true })
   if(supportRole) channel.createOverwrite(supportRole, { VIEW_CHANNEL: true, SEND_MESSAGES: true })
    
 await channel.send(`<@!${user.id}>`)
  const ticket = new Discord.MessageEmbed()
   .setColor("#3f007f")
   .setTitle("Gloss Bot Bilet Sistemi")
   .setDescription("Desteği Kapatmak İçin 🗑️ Tepkisine Tıklayınız")
   .setFooter("🔮 Tüm Hakları Saklıdır.")   
    channel.send(ticket).then(async msg => {
     await msg.react("🗑️")
     db.set(`ticketSystem_${message.guild.id}.messages.${msg.id}`, true)
    db.set(`ticketSystem_${message.guild.id}.ticketRequest.${user.id}`, true)
   })
  })
})  

client.on('messageReactionAdd', async (reaction, user) => {
  if(reaction.emoji.name !== "🗑️") return;
  let mesaj = await db.fetch(`ticketSystem_${reaction.message.guild.id}.messages.${reaction.message.id}`)
  if(mesaj){
    reaction.message.channel.delete()
     db.delete(`ticketSystem_${reaction.message.guild.id}.messages.${reaction.message.id}`)
     db.delete(`ticketSystem_${reaction.message.guild.id}.ticketRequest.${user.id}`)
  }
})
//////////////////////////////destek/////////////////////////////////////////////


client.on("message", message => {


let seviyesistemi = db.get(`seviyesistemi_${message.guild.id}`)

if(seviyesistemi == "açık") {

let seviyexpp = db.get(`seviyexpp_${message.guild.id}`)
if(seviyexpp == "ayarlı") {
//
let seviyexp = db.get(`seviyexps_${message.guild.id}`)
let seviyelog = db.get(`seviyelog_${message.guild.id}`)
//

//
let seviyerol1 = db.get(`seviyerol1_${message.guild.id}`)
let seviyerol2 = db.get(`seviyerol2_${message.guild.id}`)
let seviyerol3 = db.get(`seviyerol3_${message.guild.id}`)
let seviyerol4 = db.get(`seviyerol4_${message.guild.id}`)
//


db.add(`xpss_${message.guild.id}_${message.author.id}`, seviyexp)

let xp = db.get(`xpss_${message.guild.id}_${message.author.id}`)
if(xp == "5000") {

client.channels.cache.get(seviyelog).send(`${message.author.tag} Adlı kişi 1.000 puan olarak 1 seviye oldu ve <@&${seviyerol1 || "Ayarlanmamış"}> rolünü kazandı!`)
message.member.roles.add(seviyerol1)
}

if(xp == "10000") {
client.channels.cache.get(seviyelog).send(`${message.author.id} Adlı kişi 10.000 puan olarak 2 seviye oldu ve <@&${seviyerol2 || "Ayarlanmamış"}> rolünü kazandı!`)
message.member.roles.add(seviyerol2)
}

if(xp == "15000") {
client.channels.cache.get(seviyelog).send(`${message.author.id} Adlı kişi 15.000 puan olarak 3 seviye oldu ve <@&${seviyerol3 || "Ayarlanmamış"}> rolünü kazandı!`)
message.member.roles.add(seviyerol3)
}

if(xp == "20000") {
client.channels.cache.get(seviyelog).send(`${message.author.id} Adlı kişi **\`20.000\`** puan olarak 4 seviye oldu ve <@&${seviyerol4 || "Ayarlanmamış"}> rolünü kazandı!`)
message.member.roles.add(seviyerol4)
}

}
}

})

////////////////sayaç/////////////////
client.on('guildMemberAdd', member => {
  let sayaç = db.get(`sayaç_${member.guild.id}.sayı`);
  let kanal = db.get(`sayaç_${member.guild.id}.kanal`);
  let user = client.users.cache.get(member.id);
  if(!sayaç && !kanal) return
  if(member.guild.memberCount >= sayaç){
    return  member.guild.channels.cache.get(kanal).send("🎉  Hedef Sayıya Ulaşıldı!") 
  }
   const embed = new Discord.MessageEmbed()
     .setAuthor("PekaBot", "https://cdn.discordapp.com/attachments/783305588632584202/783975503178366987/pekayenilogo.png")
     .setColor("#00ff51")
     .setDescription(`> **Sunucuya Hoşgeldin,** <@${member.user.id}>!\n\n> **Seninle** Beraber **\`${member.guild.memberCount}\`** Kişi Olduk.\n\n> **\`${sayaç}\`** Kişi Olmaya **\`${sayaç - member.guild.memberCount}\`** Kişi Kaldı.`)
 .setImage("https://i.hizliresim.com/19WWMi.gif")
 .setThumbnail(user.avatarURL({ dynamic: true, format: 'gif', format: 'png', format: 'jpg', size: 2048}))
   member.guild.channels.cache.get(kanal).send(embed)
})
client.on('guildMemberRemove', member => {
  let sayaç = db.get(`sayaç_${member.guild.id}.sayı`);
  let kanal = db.get(`sayaç_${member.guild.id}.kanal`);
  if(!sayaç && !kanal) return
     const embed = new Discord.MessageEmbed()
     .setAuthor("PekaBot", "https://cdn.discordapp.com/attachments/783305588632584202/783975503178366987/pekayenilogo.png")
     .setColor("#ff0000")
     .setDescription(`> **Görüşürüz,** <@${member.user.id}>!\n\n> Toplam**\`${member.guild.memberCount}\`** Kişi Kaldık.\n\n> **\`${sayaç}\`** Kişi Olmaya **\`${sayaç - member.guild.memberCount}\`** Kişi Kaldı.
    `)
     .setImage("https://i.hizliresim.com/UWI6lm.gif")
    .setThumbnail(client.users.cache.get(member.id).avatarURL({ dynamic: true, format: 'gif', format: 'png', format: 'jpg', size: 2048}))
  member.guild.channels.cache.get(kanal).send(embed)
});
////////////////sayaç/////////////////
///////////////fake hesap//////////////////
client.on("guildMemberAdd", async (member, message, msg) => {
  const fakehesapp = db.fetch(`fake_${member.guild.id}`);

  if (fakehesapp == "açık") {
    var moment = require("moment");
    require("moment-duration-format");
    moment.locale("tr");
    var { Permissions } = require("discord.js");
    var x = moment(member.user.createdAt)
      .add(30, "days")
      .fromNow();
    var user = member.user;
    x = x.replace("birkaç saniye önce", " ");
    if (!x.includes("önce") || x.includes("sonra") || x == " ") {
      let rol = db.fetch(`fakerol_${member.guild.id}`);
      member.user.send(
        "Hesabınız 30 günden önce açıldığı için cezalıya atıldınız, yetkililere bildirerek açtırabilirsiniz."
      );

      
      let kanalcık = await db.fetch(`fakekanal_${member.guild.id}`);
      let kanal = member.guild.channels.cache.find(r => r.id === kanalcık);
      
      
      const embedd = new Discord.MessageEmbed()
      .setTitle("Fake hesap yakalandı!")
        .setTimestamp()
        .setDescription(
          `Bir fake hesap sisteme yakalandı ve rolü verildi. **${member}**`)
        .setTimestamp()
        .setColor("#E8C02A");
      kanal.send(embedd);
      member.roles.add(rol);
    } else {
    }
  }
});
///////////////fake hesap//////////////////

