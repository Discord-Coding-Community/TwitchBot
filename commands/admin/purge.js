const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            aliases: ['p', 'c', 'clean'],
            group: 'admin',
            memberName: 'purge',
            description: 'Purge some messages from a Text Channel.',
            examples: ['purge 5'],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },
            clientPermissions: ['MANAGE_CHANNELS'],
            userPermissions: ['MANAGE_CHANNELS'],

            args: [{
                key: 'amount',
                label: 'number',
                prompt: 'Please input a number between 0 and 100.',
                type: 'integer'
            }]
        });
    }

    run(message, args) {
        const amount = Number(args[0]) + 1;

        message.channel.bulkDelete(amount, true).then(deletedMessages => {
                var botMessages = deletedMessages.filter(m => m.author.bot);
                var userPins = deletedMessages.filter(m => m.pinned);
                var userMessages = deletedMessages.filter(m => !m.author.bot);

                const embed = new Discord.MessagEmbed()
                    .setTitle("Purge Command Issued")
                    .setDescription('The following messages have been purged.')
                    .setColor('RANDOM')
                    .setFooter('TwitchBot | twitchbot.newhorizon.dev', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                    .setThumbnail('https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                    .setTimestamp()
                    .setURL("https://twitchbot.newhorizon.dev")
                    .addField("Bot Messages Purged", botMessages.size, false)
                    .addField("User Pins Purged", userPins.size, false)
                    .addField("User Messages Purged", userMessages.size, false)
                    .addField("Total Messages Purged", deletedMessages.size, false);

                message.channel.send(embed);
            })
            .then(console.log(args[0]))
            .catch(err => {
                console.error(err);
                message.channel.send('There was an error with the command! Please contact a developer via our Discord!');
            });
    }
};