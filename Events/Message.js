const Discord = require("discord.js");
const client = global.client
let nufrain = client.nufrain
let cooldown = new Set();
module.exports = message => {
if (message.author.bot || message.channel.type == "dm" || !message.content.startsWith(client.nufrain.Prefix) ||  message.member.roles.cache.has(client.nufrain.Suspicious) || message.member.roles.cache.has(client.nufrain.Unregister)) return;
  if (message.author.bot) return;
  if (!message.content.startsWith(nufrain.Prefix)) return;
  let command = message.content.split(' ')[0].slice(nufrain.Prefix.length);
  let args = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
}
  if (cmd) {
   if (cmd.conf.enabled === true) {
      if (!client.nufrain.Sahip.includes(message.author.id) && !client.nufrain.Sahip.includes(message.author.id)) {
                return
      }
   }
  cmd.run(client, message, args)
}
  };