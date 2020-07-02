const Discord = require(`discord.js`)

exports.run = async (client, message, args) => {
  message.delete();    
  const ad = args[0]
  const link = args[1]
  
  if (ad.length < 1) return message.reply('Sunucu Adını Yazmayı Unuttunuz.');
  if (link.length < 2) return message.reply('Sunucu Adresini Yazmayı Unuttunuz.');
  
  const emoji1 = client.emojis.get('728135452753920000');
  const emoji2 = client.emojis.get('728135452753920000');
  const emoji3 = client.emojis.get('728132131074605146');
    
  const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`
      Paylaşan Kişi: <@${message.author.id}>
      ${emoji1} Adı: ${ad}
      ${emoji2} Linki: ${link}
  `,true)

      let kanal = message.guild.channels.find(`name`, "『sᴜɴᴜᴄᴜʟᴀʀ』");    
      message.guild.channels.get(kanal.id).send(embed);

  message.channel.send(`${emoji3} ${message.author.username}, Sunucunuz Paylaşıldı.`).then(msg => msg.delete(5000));
   
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sunucu-ekle', 'sunucuekle'],
  permlevel: 4
};

exports.help = {
  name: 'sunucu',
  description: 'Discord Sunucu Adresi Paylaşma.',
  usage: 'sunucu'
};
