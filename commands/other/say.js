const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class SayCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'say',
            aliases: ['make-me-say', 'print'],
            memberName: 'say',
            group: 'other',
            userPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            clientPermissions: ['SEND_MESSAGES', 'MANAGE_MESSAGES'],
            description: 'Make the bot say anything!',
            args: [{
                key: 'text',
                prompt: ':microphone2: What do you want the bot to say?',
                type: 'string'
            }]
        });
    }

    run(message, { text }) {
        const embed = new MessageEmbed()
            .setColor('RANDOM')
            .setDescription(text)
            .setThumbnail(message.author.displayAvatarURL())
            .setTimestamp(new Date().toISOString())
            .setFooter(
                'Sent by ' + message.member.displayName + '.',
                message.author.displayAvatarURL()
            );
        message.channel
            .send(embed)
            .then(
                () => message.delete().catch(e => console.error(e))
            )
            .catch(e => console.error(e));
        return;
    }
};