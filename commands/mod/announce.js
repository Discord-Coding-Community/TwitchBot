const discord = require('discord.js');
const { Command } = require('discord.js-commando');
require('dotenv').config();

module.exports = class newsCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'announce',
            aliases: ['a', 'ann', 'say', 's'],
            group: 'mod',
            memberName: 'announce',
            guildOnly: true,
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],
            throttling: {
                usages: 1,
                duration: 10
            },
            description: 'Sends a message to a specified channel.',
            examples: ['ann This is an announcement.'],
            args: [{
                key: 'text',
                prompt: 'What would you like to announce?',
                type: 'string',
            }, ],
        })
    };

    run(msg, { text }) {
        msg.guild.channels.cache
            .filter(channel => message.mentions.channels.first())
            .forEach((textChannel) => {
                textChannel.send(text)
                    .then(console.log)
                    .catch(err => {
                        console.error(err);
                        message.channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
                    });
            })
    }
};