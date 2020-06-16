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
${emoji1} **ROL KOMUTLAR** ${emoji1}
[${emoji2}] **!!abone** ${emoji3} Videoda Çekilen İçerikleri Görürsünüz.
[${emoji2}] **!!altyapı** ${emoji3} Altyapı Kanallarını Görürsünüz.
[${emoji2}] **!!js** ${emoji3} JavaScript Kanallarını Görürsünüz.
[${emoji2}] **!!html**  ${emoji3} Hml Kanallarını Görürsünüz.
[${emoji2}] **!!py**  ${emoji3} Python Kanallarını Görürsünüz.
[${emoji2}] **!!haxball**  ${emoji3} HaxBall Kodlamalarını Görürsünüz.

${emoji4} <#699018242160590969> **Kanalına Yazmalısınız.!**
`,true);
 
  message.channel.send(yardım);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["rb"],
  permlevel: 0
};

exports.help = {
  name: 'rol-bilgi',
  description: 'Yardım.',
  usage: 'rol-bilgi'
};
