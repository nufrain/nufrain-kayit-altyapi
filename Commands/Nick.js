const { DatabaseManager } = require("@aloshai/mongosha");
const  { Message, Client, MessageEmbed }  = require('discord.js');
const db = DatabaseManager.getDatabase("REGISTER2");
exports.run = async (client, message, args, params) => {

if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.some(qwe => client.nufrain.RegisterAuthorized.some(asd => asd == qwe.id))) return message.react(client.nufrain.Unverified)
let Kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!args[1]) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}isim @Kullanıcı (İsim) (Yaş)\``)
if (!args[2]) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}isim @Kullanıcı (İsim) (Yaş)\``)
let Name = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
let Age = args[2];
if (Age < client.nufrain.AgeLimit) return message.channel.send(`Sunucuda yaş sınırı ${client.nufrain.AgeLimit} olarak belirlenmiştir. Bu kullanıcının isimi değiştirilemez!`)
if(!Kullanıcı) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}isim @Kullanıcı (isim) (yaş)\``).then(x => x.delete({timeout: 3000}));
if(!Name) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}isim @Kullanıcı (isim) (yaş)\``).then(x => x.delete({timeout: 3000}));
if(!Age) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}isim @Kullanıcı (isim) (yaş)\``).then(x => x.delete({timeout: 3000}));
if(message.member.roles.highest.position <= Kullanıcı.roles.highest.position) return message.channel.send(`${Kullanıcı} Kullanıcısı senden yüksek veya rolleriniz eşit!`).then(x => x.delete({timeout: 5000}));
if(message.guild.me.roles.highest.position <= Kullanıcı.roles.highest.position) return message.channel.send(`${Kullanıcı} Kullanıcısının rolleri benim rollerimden yüksek!`).then(x => x.delete({timeout:6500}));
Kullanıcı.setNickname(`${client.nufrain.Tag ||""} ${Name.replace("_"," ")} | ${Age}`).catch(err => console.error())

  

 const data = await db.get(`isimler.${Kullanıcı.id}`);
  let cinsiyet;
  if(Kullanıcı.roles.cache.has(client.nufrain.Woman)) cinsiyet = `${client.nufrain.Woman}`;
  if(Kullanıcı.roles.cache.has(client.nufrain.Man)) cinsiyet = `${client.nufrain.Man}`;
  db.push(`isimler.${Kullanıcı.id}`, {
    Name: `${args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase()}`,
    Age: `${args[2]}`,
    Cinsiyet: cinsiyet,
    Zaman: Date.now(),
    Staff: `${message.author.id}`
  })
    let veri; 
    if(data) veri = data.map((value, index) => ` \`• ${value.Name} | ${value.Age}\` (<@&${value.Cinsiyet}>)`).reverse().slice(0, 5).join("\n")
    let messagess;
    if(data) messagess = 
    `Bu kullanıcı daha önce aşağıdaki isimlerle kayıt olmuş.
    
    ${veri}
    
    Tüm isim geçmişine \`${client.nufrain.Prefix}isimler @Extend/ID\` ile bakmanız önerilir.`
    else messagess = ``
    message.channel.send({
      embed: {
        color: 0x00FFFF,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL({dynamic: true})
        },
        description: `
        ${Kullanıcı} (\`${Kullanıcı.id}\`) adlı kullanıcının ismi \`${client.nufrain.Tag} ${args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase()} | ${args[2]}\` olarak düzenlendi.
        ${messagess}
        `,
      }
    }).then(message => message.delete({timeout: 5000}))

}

exports.conf = {
  name: "isim @Kullanıcı (isim) (yaş)",
  aliases: ["isim", "İsim", "İSİM", "Nick", "nick", "NİCK"],
  guildOnly: true
};