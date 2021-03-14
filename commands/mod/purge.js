const Discord = require('discord.js');
const { Command } = require('discord.js-commando');

module.exports = class PurgeCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'purge',
            aliases: ['p', 'c', 'clean'],
            group: 'mod',
            memberName: 'purge',
            description: 'Purge some messages from a Text Channel.',
            examples: ['purge 5'],
            guildOnly: true,
            throttling: {
                usages: 1,
                duration: 3
            },
            clientPermissions: ['MANAGE_MESSAGES'],
            userPermissions: ['MANAGE_MESSAGES'],

            args: [{
                key: 'amount',
                label: 'Number',
                prompt: 'Please input a number between 0 and 100.',
                type: 'integer'
            }]
        });
    }

    async run(msg, args) {
        let ch = msg.channel;


        const amount = Number(args.amount)
        if (Number.isNaN(amount)) {
            return msg.reply('```css\n[ERROR] Please provide a valid number.\n```')
        }

        if (amount <= 0 || amount > 100) {
            return msg.reply(
                '```css\n[ERROR] You need to input a number between 0 and 100.\n```'
            )
        }

        const limit = amount + 1
        const messages = await msg.channel.messages.fetch({ limit })
        const deletedMessages = await msg.channel.bulkDelete(messages).then(deletedMessages => {
                var botMessages = deletedMessages.filter(m => m.author.bot);
                var userPins = deletedMessages.filter(m => m.pinned);
                var userMessages = deletedMessages.filter(m => !m.author.bot);

                const embed = new Discord.MessageEmbed()
                embed.setAuthor('Twitchbot', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                embed.setTitle("Purge Command Issued")
                embed.setDescription('The following messages have been purged.')
                embed.setColor('RANDOM')
                embed.setFooter('Twitchbot | twitchbot.newhorizon.dev', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                embed.setThumbnail('https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                embed.setTimestamp(new Date().toISOString())
                embed.addField("Bot Messages Purged", botMessages.size, false)
                embed.addField("User Pins Purged", userPins.size, false)
                embed.addField("User Messages Purged", userMessages.size, false)
                embed.addField("Total Messages Purged", deletedMessages.size, false);
                ch.send(embed = embed);

            })
            .then(console.log(args[0]))
            .catch(err => {
                console.error(err);
                msg.reply('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
            })
    }
};