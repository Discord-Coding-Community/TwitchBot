const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class broadcastCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'broadcast',
            aliases: ['bcastall', 'bcast', 'bc', 'bca'],
            group: 'admin',
            memberName: 'broadcast',
            guildOnly: true,
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],
            throttling: {
                usages: 1,
                duration: 10
            },
            description: 'Sends a global tts broadcast to all text channels in the guild.',
            examples: ['bc TESTING GLOBAL BROADCAST!'],
            args: [{
                key: 'text',
                prompt: 'What would you like to broadcast?',
                type: 'string',
            }, ],
        })
    };

    run(msg, { text }) {
        msg.guild.channels.cache
            .filter(channel => channel.type === 'text')
            .forEach((textChannel) => {
                textChannel.send(text, { tts: true })
                    .then(setTimeout(() => msg.delete(), 180000))
                    .then(console.log)
                    .catch(err => {
                        console.error(err);
                        msg.channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
                    });
            })
    }
};