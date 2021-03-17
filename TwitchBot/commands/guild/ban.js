const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class BanCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'ban',
            aliases: ['ban-member', 'ban-hammer'],
            memberName: 'ban',
            group: 'guild',
            description: 'Bans a tagged member.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            args: [{
                    key: 'userToBan',
                    prompt: 'Please mention the user you want to ban with @ or provide his ID.',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: 'Why do you want to ban this user?',
                    type: 'string'
                },
                {
                    key: 'daysDelete',
                    prompt: 'How many days worth of messages do you want to delete from this user?',
                    type: 'integer',
                    validate: function validate(daysDelete) {
                        return daysDelete < 8 && daysDelete > 0;
                    }
                }
            ]
        });
    }

    async run(message, { userToBan, reason, daysDelete }) {
        const extractNumber = /\d+/g;
        const userToBanID = userToBan.match(extractNumber)[0];
        const user =
            message.mentions.members.first() ||
            (await message.guild.members.fetch(userToBanID));
        if (user == undefined)
            return message.channel.send('```css\n[ERROR] Please specify a user for me to ban.\n```');
        user
            .ban({ days: daysDelete, reason: reason })
            .then(() => {
                const embed = new MessageEmbed()
                    .addField('Banned:', userToBan)
                    .addField('Reason', reason)
                    .setColor('#420626')
                    .setTimestamp(new Date().toISOString())
                    .setFooter('TwitchBot', 'https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')
                message.channel.send(embed);
            })
            .catch(e => {
                console.error(e);
                return message.reply('```css\n[ERROR] Discord API Error:' + e.code + '[' + e.message + ']\n```\n\nPlease contact TwitchBot\'s developers at `https://dsc.gg/mtdev` to report this error.');
            });
    }
};