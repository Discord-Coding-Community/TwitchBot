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
            clientPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_CHANNELS', 'MANAGE_MESSAGES'],

            args: [{
                key: 'amount',
                label: 'number',
                prompt: 'Please input a number between 0 and 100.',
                type: 'integer'
            }]
        });
    }

    run(msg, args) {
        var purgeamnt = args[0];
        var purgelimit = Number(purgeamnt) + 1;
        msg.channel.messages.fetch({ limit: purgelimit }).then(messages => {
            msg.channel.bulkDelete(messages).then(deletedMessages => {
                    var botMessages = deletedMessages.filter(m => m.author.bot);
                    var userPins = deletedMessages.filter(m => m.pinned);
                    var userMessages = deletedMessages.filter(m => !m.author.bot);


                    const embed = new Discord.MessagEmbed()
                        .setAuthor('Twitchbot', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                        .setTitle("Purge Command Issued")
                        .setDescription('The following messages have been purged.')
                        .setColor('RANDOM')
                        .setFooter('Twitchbot | twitchbot.newhorizon.dev', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                        .setThumbnail('https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                        .setTimestamp(new Date().toISOString())
                        .addField("Bot Messages Purged", botMessages.size, false)
                        .addField("User Pins Purged", userPins.size, false)
                        .addField("User Messages Purged", userMessages.size, false)
                        .addField("Total Messages Purged", deletedMessages.size, false);

                    msg.channel.send(embed);
                })
                .then(console.log(args[0]))
                .catch(err => {
                    console.error(err);
                    msg.channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
                });
        });
    }
};