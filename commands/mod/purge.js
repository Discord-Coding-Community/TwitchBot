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
        let channel = msg.channel;


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
        try {
            const messages = await channel.messages.fetch({ limit })
            const deletedMessages = await channel.bulkDelete(messages)
            const botMessages = deletedMessages.filter(m => m.author.bot)
            const userPins = deletedMessages.filter(m => m.pinned)
            const userMessages = deletedMessages.filter(m => !m.author.bot)
            const embed = new Discord.MessageEmbed()

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
            channel.send(embed);
        } catch (err) {
            console.error(err)
            channel.send('```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```');
        }
    }
};