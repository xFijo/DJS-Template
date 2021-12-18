const Discord = require('discord.js');
const config = require('../config');

const { Client, Collection } = require('discord.js');

const client = new Client({
    disableMentions: 'everyone'
});

client.on('ready', () => {
const statuses = [
  `You can change these in bot.js`,
  `hello`,
  `how is your day`,
  `yes`,
  `thank you for using my template`
];

let i = 0;
 setInterval(() =>  client.user.setActivity(`${statuses[i++ % statuses.length]}`, { type: 'WATCHING'}), 15000);
 })

const cooldowns = new Set();
client.commands = new Collection();
client.aliases = new Collection();

['command'].forEach(handler => {
    require(`./${handler}`)(client);
});

client.on('ready', () => {
    console.log(`Client ready as ${client.user.tag}.`);
});

client.on('message', async message => {
    if (!message.content.startsWith(config.prefix) || message.author.bot) return;

    const args = message.content.slice(config.prefix.length).trim().split(' ');
    const cmd = args.shift().toLowerCase();

    if (cmd.length === 0) return;

    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) {
      try {
        if (cooldowns.has(message.author.id)) return message.channel.send('S l o w d o w n!');
  
        if (command.config.ownerOnly && !config.owners.includes(message.author.id)) return;
  
        await command.run(client, message, args);
        if (!config.owners.includes(message.author.id)) cooldowns.add(message.author.id);

        setTimeout(async () => {
          await cooldowns.delete(message.author.id);
        }, config.commandCooldown * 1000);
      } catch (err) {
        message.channel.send(`An error occured while trying to run \`${command.config.name}\`, the developers have been notified.`);
        console.log(`An error occured while trying to run \`${command.config.name}\`!`);
        console.log(err);
      }
    }
});

client.login(config.token);
