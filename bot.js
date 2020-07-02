const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
const db = require('quick.db');
const dctrat = require('dctr-antispam.js'); 
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

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
    } catch (e){
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
    } catch (e){
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
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  if(!message.guild) {
	return; }
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

// DEGİSEN SES KANALLARI \\

client.on('guildMemberAdd', async(member) => {
const kanal = `${member.user.username}`
let channel = client.channels.get("727985728843415614") //KANAL İD
channel.setName(kanal);
});

//Sunucuya biri girdiğinde kanal ismi değiştirme
client.on("guildMemberAdd", message => {
  client.channels
    .get("727986665523773450")
    .setName(`🔵 Kişi Sayısı: ${message.guild.memberCount} 📤`);
  // kanal id yazan yerlere sesli kanalın id'sini sağtıklayıp kopyalayın ve yapıştırın
});
//Sunucudan Çıktığın Kişi Sayını Azaltma
client.on("guildMemberRemove", message => {
  client.channels
    .get("727986665523773450")
    .setName(`🔴 Kişi Sayısı: ${message.guild.memberCount} 📥`);
});
// DEGİSEN SES KANALLARI \\

// GERECLER \\
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!!js') {  // İstediğiniz Komut
msg.delete();    
  const yasak = client.emojis.get('728130320796352573');
  if (msg.channel.id !== '727985775144206367') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));
      if(!msg.member.roles.find("name", "JavaScript")){
       msg.member.addRole("727985716533133312") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Js Rolünü Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
    }else{msg.reply("JavaScript Rolünü Zaten Önceden Almışsın.");}

  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!!py') {  // İstediğiniz Komut
msg.delete();    
      if(!msg.member.roles.find("name", "Python")){
  const yasak = client.emojis.get('728130320796352573');
  if (msg.channel.id !== '727985775144206367') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));        
       msg.member.addRole("727985717589966858") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Py Rolünü Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
      }else{msg.reply("Python Rolünü Zaten Önceden Almışsın.");}
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!!abone') {  // İstediğiniz Komut
msg.delete();    
      if(!msg.member.roles.find("name", "Abone")){
  const yasak = client.emojis.get('728130320796352573');
  if (msg.channel.id !== '727985775144206367') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));        
       msg.member.addRole("727985719548837989") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Abone Rolünü Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
      }else{msg.reply("Abone Rolünü Zaten Önceden Almışsın.");}
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!!altyapı') {  // İstediğiniz Komut
msg.delete();    
      if(!msg.member.roles.find("name", "Altyapı")){
  const yasak = client.emojis.get('728130320796352573');
  if (msg.channel.id !== '727985775144206367') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));        
       msg.member.addRole("727985719108436028") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Altyapı Rolünü Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
      }else{msg.reply("Altyapı Rolünü Zaten Önceden Almışsın.");}
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!!haxball') {  // İstediğiniz Komut
msg.delete();    
      if(!msg.member.roles.find("name", "HaxBall")){
  const yasak = client.emojis.get('728130320796352573');
  if (msg.channel.id !== '727985775144206367') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));        
       msg.member.addRole("727985720215732326") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('HaxBall Rolünü Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
      }else{msg.reply("HaxBall Rolünü Zaten Önceden Almışsın.");}
  }
});
client.on('message', msg => {
  if (msg.content.toLowerCase() === '!!html') {  // İstediğiniz Komut
msg.delete();    
  const yasak = client.emojis.get('728130320796352573');
  if (msg.channel.id !== '727985775144206367') return msg.channel.send(`${yasak} **Bu komutun kullanımı, bu kanalda engellenmiştir.**`).then(m => m.delete(5000));    
      if(!msg.member.roles.find("name", "Html")){    
       msg.member.addRole("727985718416375889") //Rolü bir yerde bahsedin sonra sağ tıklayıp İD'sini alın
    msg.reply('Html Rolünü Başarıyla Aldın.'); //Komutu Yazınca cevap ne yazsın?
      }else{msg.reply("Html Rolünü Zaten Önceden Almışsın.");}        
  }
});
// GERECLER \\

// SPAM \\
client.on('ready', () => {
   dctrat(client, {
        uyarılimiti: 4, // Uyarı limiti.
        susturmalimiti: 6, // Susturma limiti.
        aralık: 1500, // Mesaj yazma aralığı. ms olarak ayarlayınız
        uyarımesajı: "Spam yapmayı keser misin? Yoksa susturulacaksın!!", // Uyarı mesajı
        susturmamesajı: "Çok faaazla mesaj!! Susturuldun.", // Susturulma mesajı
        maksspam_uyarı: 3,// Kullanıcılar aynı iletiyi spam gönderirken, X üyesi 8'den fazla ileti gönderdiğinde kullanıcılar uyarı alır.
        maksspam_susturma: 4, // Kullanıcılar aynı iletiyi spam gönderirken, X üyesi 10'den fazla ileti gönderdiğinde kullanıcılar susturulur.
        adminrol: ["Kurucu","Admin","Moderatör","Teknik Destek Lideri","Teknik Destek","Kod Paylaşım Ekibi","Developer"], // Bu rollere sahip kullanıcılar engellenmez
        adminkullanıcı: ["々 LoZ 'Beyᴳᴼᴰ™#0808"], // Bu kullanıcılar engellenmez
        susturmarolü: "Susturuldu", // Kullanıcı spam yaparsa otomatik olarak susturulur eğer rol açılmaza otomatik olarak açılır.
        susturmasüresi: 900000, // Susturma süresi bir kullanıcı spam yaptığı için susturulursa verilecek ceza süresi (15dk) ms olarak ayarlayınız.
        logkanalı: "antispam-log" // Susturulmaların ve kaldırılmalarının atılacağı log kanalı (açılmazsa otomatik bu isimde açılır.)
      });
  });
 
client.on('message', msg => {
  client.emit('checkMessage', msg); 
})
// SPAM \\


// ŞÜPHELİ HESAP \\
client.on('guildMemberAdd',async member => {
  let gkisi = client.users.get(member.id);
  
    const ktarih = new Date().getTime() - gkisi.createdAt.getTime();   
    if (ktarih < 259200) 
  member.addRole("727985722732052561")
});
// ŞÜPHELİ HESAP \\
