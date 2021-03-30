const Discord = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');
module.exports = class PruneCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'prune',
            aliases: ['purge', 'delete', 'clean'],
            group: 'guild',
            memberName: 'prune',
            description: 'Delete some messages from a Text Channel.',
            examples: [`${config.prefix}prune [1-100]`],
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


    async run(message, args) {
        const { channel } = message
        const amount = Number(args.amount)
        if (Number.isNaN(amount)) {
            return message.reply(
                '```css\n[ERROR] Please provide a valid number.\n```'
            )
        }

        if (amount <= 0 || amount > 100) {
            return message.reply(
                '```css\n[ERROR] You need to input a number between 0 and 100.\n```'
            )
        }

        const limit = args.amount + 1
        try {
            const messages = await channel.messages.fetch({ limit })
            const deletedMessages = await channel.bulkDelete(messages)
            const botMessages = deletedMessages.filter(m => m.author.bot)
            const userPins = deletedMessages.filter(m => m.pinned)
            const userMessages = deletedMessages.filter(m => !m.author.bot)
            var embed = new Discord.MessageEmbed()
                .setTitle("Prune Command Issued")
                .setDescription('The following messages have been deleted.')
                .setColor('RANDOM')
                .setFooter('Twitchbot', 'https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                .setThumbnail('https://images-ext-2.discordapp.net/external/6vZM6YeZGzfxd4PF_aw3UnNHZafkdNlRoLp46YJ7hkU/%3Fsize%3D256/https/cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                .setTimestamp(new Date().toISOString())
                .addField("Bot Messages Deleted", botMessages.size, false)
                .addField("User Pins Deleted", userPins.size, false)
                .addField("User Messages Deleted", userMessages.size, false)
                .addField("Total Messages Deleted", deletedMessages.size, false);
            channel.send(embed)
        } catch (err) {
            console.error(err)
            channel.send(
                '```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```'
            )
        }
    }
};