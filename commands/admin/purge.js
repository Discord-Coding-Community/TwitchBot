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

            args: [
                {
                    key: 'amount',
                    label: 'number',
                    prompt: 'Please input a number between 0 and 100.',
                    type: 'integer'
                }
            ]
        });
    }

    run(message, args) {
        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('```css\n[ERROR] Please provide a valid number.\n```');
        } else if (amount <= 0 || amount > 100) {
            return message.reply('```css\n[ERROR] You need to input a number between 0 and 100.\n```');
        }

        message.channel.bulkDelete(amount, true).then(deletedMessages => {
            var botMessages = deletedMessages.filter(m => m.author.bot);
            var userPins = deletedMessages.filter(m => m.pinned);
            var userMessages = deletedMessages.filter(m => !m.author.bot);

            const embed = new Discord.RichEmbed()
                .setTitle(client.user.name)
                .setColor("RANDOM")
                .setFooter(`${client.user.name}`, `${client.user.avatarURL}`)
                .setThumbnail(`${client.user.avatarURL}`)
                .setTimestamp()
                .addField("Bot Messages Purged", botMessages.size, false)
                .addField("User Pins Purged", userPins.size, false)
                .addField("User Messages Purged", userMessages.size, false)
                .addField("Total Messages Purged", deletedMessages.size, false);

            message.channel.send(embed);
        }).then(console.log).catch(err => {
            console.error(err);
            message.channel.send('```css\n[ERROR] Command Failed. Please contact an Administrator.\n```');
        });
    }
};