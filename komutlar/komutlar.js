const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
  
    try {
        await message.channel.send(`**__Komutlar;__** \n${client.commands.map(props => ` ${props.help.name}\n `).join(" :white_small_square: ")}`);
    } catch (e) {
        throw e;
    }
}

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["ikrudka"],
  permLevel: 0
};

module.exports.help = {
  name: '345359034590',
  description: 'Botta bulunan tüm komutları gösterir',
  usage: '2345905*380340*'
};
