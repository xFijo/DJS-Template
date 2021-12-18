module.exports.run = async (client, message, args) => {
const { MessageEmbed } = require('discord.js')

const pingEmbed = new MessageEmbed()
.setTitle(`Ping: ${Date.now() - message.createdTimestamp}ms`)
.setColor('PURPLE')
.setFooter('Your customized Footer')

message.channel.send(pingEmbed)
}

module.exports.config = {
    name: 'ping',
    description: 'Sends the bot\'s connection to Discord\'s API.',
    category: 'info',
    usage: ' ',
    example: ' ',
}
