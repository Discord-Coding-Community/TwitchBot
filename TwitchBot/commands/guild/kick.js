const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['kick-member', 'throw'],
            memberName: 'kick',
            group: 'guild',
            description: 'Kicks a tagged member.',
            guildOnly: true,
            userPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            clientPermissions: ['MANAGE_MESSAGES', 'KICK_MEMBERS', 'BAN_MEMBERS'],
            args: [{
                    key: 'userToKick',
                    prompt: 'Please mention the user you want to kick with @ or provide his ID.',
                    type: 'string'
                },
                {
                    key: 'reason',
                    prompt: 'Why do you want to kick this user?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { userToKick, reason }) {
        const extractNumber = /\d+/g;
        const userToKickID = userToKick.match(extractNumber)[0];
        const user =
            message.mentions.members.first() ||
            (await message.guild.members.fetch(userToKickID));
        if (user == undefined)
            return message.channel.send('```css\n[ERROR] Please specify a user for me to kick.\n```');
        user
            .kick(reason)
            .then(() => {
                const embed = new MessageEmbed()
                    .addField('Kicked:', userToKick)
                    .addField('Reason:', reason)
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