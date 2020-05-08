const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async(client, message, args) => {
  
    message.delete()
    if (!message.member.roles.find("name", "Yetkili")) {
        return message.channel.send(' **Bu Komutu Kullanmak için** \*`Yetkili*\` **Rolüne Sahip Olman Lazım** ')
            .then(m => m.delete(5000));
    }  
    let member = message.mentions.members.first() || message.guild.members.get(args[0]);
    const seviyemiktar = args.slice(1).join('')
    let seviye = await db.add(`seviye_${member.id + message.guild.id}`, +seviyemiktar);
  let guncelseviye = await db.fetch(`seviye_${member.id + message.guild.id}`,);
  message.channel.send(`${member} Seviye Eklendi. **Eklenen Seviye:** ${seviyemiktar}, **Güncel Seviyesi:** ${guncelseviye} `)
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: 'seviye-ekle',
  description: '!!seviye-ekle @etiket [MIKTAR]',
  usage: 'seviye-ekle'
};