const Discord = require('discord.js');

exports.run = (client, message, args) => {
	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

    if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(" Bu komudu kullanabilmek için `Üyeleri Yasakla` yetkisine sahip olmanız gerek.");
    let kullanici = args[0];
    if (!kullanici) return message.channel.send("Banlanan Bir kullanıcının ID'sini belirtmen gerek")
    message.guild.fetchBans()
        .then(bans => {
            if (!bans.has(kullanici)) {
                return message.channel.send(`Bu kullanıcı banlanmamış.`)
            }
        })
    message.guild.fetchBan(kullanici).then(({ user, reason }) => {
        var sebep;
        if (reason === null) sebep = "Neden belirtilmemiş"
const Embed = new Discord.RichEmbed()
 .setColor('#FFD100')
.setAuthor('Ban Sorgulama', client.user.avatarURL)
.setDescription(`${user.tag} adlı kullanıcının ban nedeni: \n\n**${reason}**`)
message.channel.send(Embed)
    })
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['bansorgulama','bansorgu','ban-sorgulama','BANSORGULAMA','ban-sorgu'],
    permLevel: 0
};

exports.help = {
    name: 'bansorgulama',
    description: 'Ban sorgulama yaparsınız',
    usage: 'bansorgulama'
};