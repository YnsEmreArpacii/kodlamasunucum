const Discord = require('discord.js');
exports.run = (client, message, args) => {
    message.delete();
  const emoji1 = client.emojis.get('705381124414898246');
  const emoji2 = client.emojis.get('705381182510071839');
  const emoji3 = client.emojis.get('705381124326686741');
  const emoji4 = client.emojis.get('705381125417336844');
  
  const yardım = new Discord.RichEmbed()
.setColor(`RANDOM`)
.setDescription(`
${emoji1} **Sunucu Listesi** ${emoji1}
[${emoji2}] Ana Sunucu 》 [Tıkla](https://discord.gg/JM2cYf6)
[${emoji2}] Çekirdek Sunucu 》 [Tıkla](https://discord.gg/kGepmr5)
`,true);
 
  message.channel.send(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["s"],
  permlevel: 0
};

exports.help = {
  name: 'sunucular',
  description: 'Yardım.',
  usage: 'sunucular'
};
