const Discord = require('discord.js');
exports.run = (client, message, args) => {
      if (!message.member.roles.find("name", "🔑")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`🔑*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
  if (!message.guild) {
  const ozelmesajuyari = new Discord.RichEmbed()
  .setColor(0xFF0000)
  .setTimestamp()
  .setAuthor(message.author.username, message.author.avatarURL)
  .addField(':warning: Uyarı :warning:', '`Ban` adlı komutu özel mesajlarda kullanamazsın.')
  return message.author.send(ozelmesajuyari); }
  let guild = message.guild
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = guild.channels.find('name', 'mod-log');
  if (!modlog) return message.reply('`mod-log` kanalı oluşturman lazım.');
  if (reason.length < 1) return message.reply('Sunucudan atma sebebini yaz.');
  if (message.mentions.users.size < 1) return message.reply('Kimi atıcağımı yazmadın.').catch(console.error);
  
  let member = message.guild.member(user)
  if (member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`<:no:663378512417128449> Kendi yetkimin üstündeki kişileri yasaklayamam.`)
  message.guild.member(user).ban();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .addField('Eylem:', 'Sunucudan Banlama')
    .addField('Kullanıcı:', `${user.username}#${user.discriminator} (${user.id})`)
    .addField('Yetkili:', `${message.author.username}#${message.author.discriminator}`)
    .addField('Sebep', reason);
  return guild.channels.get(modlog.id).send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['at'],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'İstediğiniz kişiyi sunucudan atar.',
  usage: 'ban [kullanıcı] [sebep]'
};
