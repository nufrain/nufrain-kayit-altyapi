const Discord = require('discord.js');
const client = global.client = new Discord.Client()
const fs = require('fs');
const moment = require('moment');
const ms = require('ms');
const {Database, DatabaseManager} = require("@aloshai/mongosha");
moment.locale('tr');
client.nufrain = require("./Nufrain.json");
require('./Events/EventLoader')(client);
//////////////////////////////////////////////////
DatabaseManager.connect(client.nufrain.MongoURL)
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./Commands/', (err, files) => {
    if (err) console.error(err);
    files.forEach(dosya => {
        let props = require(`./Commands/${dosya}`)
        console.log(`[Commands] ${props.conf.name}`);
        client.commands.set(props.conf.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.conf.name);
        });
    });
});                                                                                                                                          

client.on('ready', () => {
  client.user.setPresence({
   activity: {
   name: `${client.nufrain.BotActivity}`, type: "PLAYING" }, 
   status: "dnd"})
});


//***********************************************************************************************//
//****************************************** WELCOME ********************************************//
//***********************************************************************************************//
client.on('guildMemberAdd', (member) => {
      require("moment-duration-format")
    let user = client.users.cache.get(member.id);
  let Arrow = `\`>\``
  const Number = {" ": "",
        "0": client.nufrain.Number0,
        "1": client.nufrain.Number1,
        "2": client.nufrain.Number2,
        "3": client.nufrain.Number3,
        "4": client.nufrain.Number4,
        "5": client.nufrain.Number5,
        "6": client.nufrain.Number6,
        "7": client.nufrain.Number7,
        "8": client.nufrain.Number8,
        "9": client.nufrain.Number9,
    };
    var Total = member.guild.memberCount
    var TotalEmojis = `${Total}`.split("").map(c => Number[c] || c).join("")
    let Day = new Date().getTime() - (user.createdAt).getTime();
    const Zaman = moment.duration(Day).format(` YY **[Yıl]** DD **[Gün]** HH **[Saat]** mm **[Dakika,]**`) 
    if (Day > 604800000) { /////// 604800000 = 7 Gün
        client.channels.cache.get(client.nufrain.WelcomeChannel).send(`${Arrow} Sunucumuza hoş geldin ${member.user} - \`(${member.id})\` 
${Arrow} Hesabın \`${moment.utc(member.user.createdAt).format('DD.MM.YYYY')}\` tarihinde oluşturulmuş.
${Arrow} Sunucu kurallarımız <#${client.nufrain.RulesChannel}> kanalında belirtilmiştir, Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.
${Arrow} Seninle birlikte **${TotalEmojis}** kişi olduk. Kayıt Olmak İçin **Voice Confirmed** Ses odalarına girmelisiniz. İyi Eğlenceler! :tada:`).catch(err => {});
        member.roles.set([client.nufrain.Unregister])
    } else {
        client.channels.cache.get(client.nufrain.WelcomeChannel).send(`${member}, adlı kullanıcının hesabı \`${Zaman}\` önce açıldığı için **Suspicious** rolü verildi!`)
        member.roles.set([client.nufrain.Suspicious])
    }
})








client.login(client.nufrain.Token).then(c => console.log(`${client.user.tag} | Giriş yapıldı!`)).catch(err => console.error("Token Hatalı!"));