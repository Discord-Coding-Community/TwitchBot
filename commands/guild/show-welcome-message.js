const { Command } = require('discord.js-commando');
const { prefix } = require('../../config.json');

module.exports = class ShowWelcomeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'show-welcome-message',
            memberName: 'show-welcome-message',
            group: 'guild',
            guildOnly: true,
            description: 'Lets you see the Welcome Image with its current settings',
            aliases: [
                'show-welcome',
                'showwelcome',
                'welcome-me',
                'welcomeme'
            ],
            examples: [
                '`' + prefix + 'show-welcome-message'
            ],
            throttling: {
                usages: 2,
                duration: 8
            }
        });
    }

    run(message) {

        this.client.emit('guildMemberAdd', message.member);
    }
};