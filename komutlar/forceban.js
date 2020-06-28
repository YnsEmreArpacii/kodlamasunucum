const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    if (!message.member.roles.find("name", "🔑")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`🔑*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
    var sebeb = args.slice(1).join(" ");
    var seyfooo = args[0]
    var now = new Date()
    if (!sebeb) {
        message.guild.fetchBans()
            .then(bans => {
                if (bans.has(seyfooo)) {
                    return message.channel.send(`:x: Bu Kullanıcı Zaten Yasaklanmış.`)
                }
                message.guild.ban(seyfooo, sebeb)
                    .then(async (member) => {
                        let user;
                        if (member instanceof Discord.GuildMember) {
                            user = member.user;
                        }
                        else if (member instanceof Discord.User) {
                            user = member;
                        }
                        else {
                            user = await client.fetchUser(member);
                        }
                        message.channel.send(`<@!${user.id}> adlı kullanıcı banlandı `);
                    })
                    .catch(error => {
                        message.channel.send(`:x: Bir Hata Oluştu`);
                        console.error(':x: Hata:', error);
                    });
            });
    } else {
        message.guild.fetchBans()
            .then(bans => {
                if (bans.has(seyfooo)) {
                    return message.channel.send(`Bu Kullanıcı Zaten Yasaklanmış.`)
                }
                message.guild.ban(seyfooo, sebeb)
                    .then(async (member) => {
                        let user;
                        if (member instanceof Discord.GuildMember) {
                            user = member.user;
                        }
                        else if (member instanceof Discord.User) {
                            user = member;
                        }
                        else {
                            user = await client.fetchUser(member);
                        }
                        message.channel.send(`<@!${user.id}> sunucudan yasaklandı `);
                    })
                    .catch(error => {
                        message.channel.send(` Bir Hata Oluştu`);
                        console.error(' Hata:', error);
                    });
            });
    }

}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['force-ban'],
    permLevel: 0

};

exports.help = {
    name: 'forceban',
    description: 'Oylama yapmanızı sağlar.',
    usage: 'forceban <id>'
};
