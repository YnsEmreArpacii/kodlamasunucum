const Discord = require('discord.js');
exports.run = (client, message, args) => {
    message.delete()
    if (!message.member.roles.find("name", "Grafik Tasarım Lideri")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`Grafik Tasarım Lideri*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
    if (!message.guild) {
        const ozelmesajuyari = new Discord.RichEmbed()
            .setColor(0xFF0000)
            .setTimestamp()
            .setAuthor(message.author.username, message.author.avatarURL)
            .addField(':warning: **Uyarı** :warning:', '`YETKILI` **adlı komutu özel mesajlarda kullanamazsın.**')
        return message.author.sendEmbed(ozelmesajuyari);
    }
    let guild = message.guild
    let user = message.mentions.members.first()

    if (!user) return message.reply('**Kimi Yetkili Yapacağını Seçmedin!**').catch(console.error);
    user.addRole('727985701534040095');
  
      let kanal = message.guild.channels.find(`name`, "yetkili-log");    
    const embed = new Discord.RichEmbed()
        .setDescription(`LIDER ${message.author} Tarafından. | ${user} Artık **Grafik Tasarım** Ekibine Katıldı.!`)
        .setFooter('Rol alma sistemi', client.user.avatarURL)
        .setColor("RANDOM")
        .setTimestamp()
    kanal.send({ embed })
    message.channel.send(`LIDER ${message.author} Tarafından. | ${user} Artık **Grafik Tasarım** Ekibine Katıldı.!`)
    user.send(`LIDER ${message.author} Tarafından. | ${user} Artık **Grafik Tasarım** Ekibine Katıldı.!`)
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['grafiktasarım-ekle'],
    permLevel: 0
};

exports.help = {
    name: 'gtasarım-ekle',
    description: 'İstediğiniz kişiden istediğiniz rolü alır.',
    usage: 'gtasarım-ekle [kullanıcı]'
};
