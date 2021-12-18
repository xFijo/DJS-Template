const { MessageEmbed } = require('discord.js');
function clean(text) {
    if (typeof text === 'string') {
        // return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
        return text.replace(/`/g, '`' + String.fromCharCode(8203)).replace(/@/g, '@' + String.fromCharCode(8203));
    }
}

module.exports.run = async (client, message, args, BotModel) => {
    const code = args.slice(0).join(' ');
    if (!code) return;

    try {
        let evaled = await eval(code);
        if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);

        if (evaled.length > 2048) return console.log(evaled);
    
        const embed = new MessageEmbed()
        .setColor('PURPLE')
        .setAuthor('Eval', message.author.displayAvatarURL({dynamic:true}))
        .setDescription(`\`\`\`js\n${clean(evaled)}\`\`\``)
        message.channel.send(embed);
    } catch (err) {
        const embed = new MessageEmbed()
        .setColor('PURPLE')
        .setAuthor('Eval', message.author.displayAvatarURL({dynamic:true}))
        .setDescription(`\`\`\`js\n${err}\`\`\``)
        message.channel.send(embed);
    }


}

module.exports.config = {
    name: 'eval',
    description: 'Evaluate code from Discord.',
    category: 'owner',
    aliases: ['e'],

    usage: 'eval <code>',
    example: 'eval 1 + 1',

    dmOnly: false,
    guildOnly: false,
    ownerOnly: true
}
