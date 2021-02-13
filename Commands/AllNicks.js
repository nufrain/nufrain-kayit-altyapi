const { DatabaseManager } = require("@aloshai/mongosha");
const  { Message, Client, MessageEmbed }  = require('discord.js');
const db = DatabaseManager.getDatabase("REGISTER");
const moment = require('moment');
moment.locale("tr")
exports.run = async (client, message, args, params) => {

if(!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.some(qwe => client.nufrain.RegisterAuthorized.some(asd => asd == qwe.id))) return message.react(client.nufrain.Unverified)
let Kullanıcı = message.mentions.members.first() || message.guild.members.cache.get(args[0])
if(!Kullanıcı) return message.channel.send(`Doğru Kullanım \`${client.nufrain.Prefix}isimler @Kullanıcı\``).then(x => x.delete({timeout: 3000}));
const data = await db.get(`isimler.${Kullanıcı.id}`) || []
    let veri;
    if(data.length > 0) veri = `
    ${Kullanıcı} (\`${Kullanıcı.id}\`) adlı kullanıcının **${data.length}** adet isim geçmişi bulundu.
    
    ${data.map((value, index) => `\`• ${value.Name} | ${value.Age}\` (<@&${value.Cinsiyet}>) [<@${value.Staff}> tarafından **${moment.utc(value.Zaman).format('DD.MM.YYYY')}** tarihinde]`).join("\n")}`
    if(!data || data.length <= 0) veri = `${Kullanıcı} (\`${Kullanıcı.id}\`) adlı kullanıcının bir isim geçmişi bulunamadı.`
    message.channel.send({
      embed: {
        color: 0x00FFFF,
        author: {
          name: message.author.tag,
          icon_url: message.author.avatarURL({dynamic: true})
        },
        description: veri,
      }
    })

}


exports.conf = {
  name: "isimler @Kullanıcı",
  aliases: ["isimler", "İsimler", "İSİMLER", "nickler", "Nickler", "NİCKLER"],
  guildOnly: true
};
