const { Command } = require('discord.js-commando');

module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            aliases: ['delete-messages', 'bulk-delete', 'purge', 'clear'],
            description: 'Delete up to 99 recent messages.',
            group: 'guild',
            memberName: 'prune',
            guildOnly: true,
            userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            args: [{
                key: 'deleteCount',
                prompt: 'How many messages do you want to delete?',
                type: 'integer',
                validate: deleteCount => deleteCount < 100 && deleteCount > 0
            }]
        });
    }

    run(message, { deleteCount }) {
        var amount = deleteCount + 1
        message.channel
            .bulkDelete(amount)
            .then(messages => message.reply(`Deleted ${messages.size} messages`))
            .catch(e => {
                console.error(e);
                return message.reply('```css\n[ERROR] Discord API Error' + e.code + '[' + e.message + ']\n```');
            });
    }
};