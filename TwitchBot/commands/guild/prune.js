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
        let embed = new DynamicsCompressorNode.MessageEmbed()
            .setTitle('TwitchBot')
            .setDescription('[SUCCESS] Deleted ' + deleteCount + ' messages.')
            .setTimestamp(new Date().toISOString())
            .setFooter('TwitchBot', 'https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
        var amount = deleteCount + 1
        message.channel
            .bulkDelete(amount)
            .then(message.reply(embed)
                .catch(e => {
                    console.error(e);
                    return message.reply('```css\n[ERROR] Discord API Error:' + e.code + '[' + e.message + ']\n```\n\nPlease contact TwitchBot\'s developers at `https://dsc.gg/mtdev` to report this error.');
                })
            )
    };

};