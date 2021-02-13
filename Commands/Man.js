const { DatabaseManager } = require("@aloshai/mongosha");
const  { Message, Client, MessageEmbed }  = require('discord.js');
const db = DatabaseManager.getDatabase("REGISTER");
exports.run = async (client, message, args, params) => {

if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.some(qwe => client.nufrain.RegisterAuthorized.some(asd => asd == qwe.id))) return message.react(client.nufrain.Unverified)
let Kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if (!args[1]) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}erkek @Kullanıcı (İsim) (Yaş)\``)
if (!args[2]) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}erkek @Kullanıcı (İsim) (Yaş)\``)
let Name = args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase();
let Age = args[2];
if (Age < client.nufrain.AgeLimit) return message.channel.send(`Sunucuda yaş sınırı ${client.nufrain.AgeLimit} olarak belirlenmiştir. Bu kullanıcı kayıt edilemez!`)
if(!Kullanıcı) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}erkek @Kullanıcı (isim) (yaş)\``).then(x => x.delete({timeout: 3000}));
if(!Name) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}erkek @Kullanıcı (isim) (yaş)\``).then(x => x.delete({timeout: 3000}));
if(!Age) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}erkek @Kullanıcı (isim) (yaş)\``).then(x => x.delete({timeout: 3000}));
if(message.member.roles.highest.position <= Kullanıcı.roles.highest.position) return message.channel.send(`${Kullanıcı} Kullanıcısı senden yüksek veya rolleriniz eşit!`).then(x => x.delete({timeout: 5000}));
if(message.guild.me.roles.highest.position <= Kullanıcı.roles.highest.position) return message.channel.send(`${Kullanıcı} Kullanıcısının rolleri benim rollerimden yüksek!`).then(x => x.delete({timeout:6500}));
Kullanıcı.roles.cache.has(client.nufrain.BoosterRole) ? Kullanıcı.roles.set(client.nufrain.Man.concat(client.nufrain.BoosterRole)) : Kullanıcı.roles.set([client.nufrain.Man]);  
Kullanıcı.setNickname(`${client.nufrain.Tag ||""} ${Name.replace("_"," ")} | ${Age}`).catch(err => console.error())
let data = await db.get(`isimler.${Kullanıcı.id}`);
     await db.push(`isimler.${Kullanıcı.id}`, { 
     Name: `${args[1].charAt(0).toUpperCase() + args[1].slice(1).toLowerCase()}`,
     Age: `${args[2]}`,
     Cinsiyet: `${client.nufrain.Man}`,
     Zaman: Date.now(),
     Staff: `${message.author.id}`
});
let veri; 
if(data) veri = data.map((value, index) => ` \`• ${value.Name} | ${value.Age}\` (<@&${value.Cinsiyet}>)`).reverse().slice(0, 5).join("\n")
let messagess;

if(data) messagess = `
${client.nufrain.Unverified} Bu kullanıcı daha önce aşağıdaki isimlerle kayıt olmuş. 
${veri}\n
Tüm isim geçmişine \`${client.nufrain.Prefix}isimler @Nufrain/ID\` ile bakmanız önerilir.`
else messagess = ``
  
message.channel.send(new MessageEmbed().setColor("RANDOM").setAuthor(message.author.tag, message.author.avatarURL({dynamic: true})).setDescription(`${Kullanıcı} (\`${Kullanıcı.id}\`) başarılı olarak <@&${client.nufrain.Man}> olarak kaydedildi.
        ${messagess}`)

    )
}


exports.conf = {
  name: "man @Kullanıcı (isim) (yaş)",
  aliases: ["man", "Man", "MAN", "Erkek", "erkek", "ERKEK", "e", "E"],
  guildOnly: true
};
