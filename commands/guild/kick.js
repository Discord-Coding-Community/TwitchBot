const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const config = require('../../config.json')

module.exports = class KickCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'kick',
            aliases: ['kick-member', 'throw', 'k'],
            memberName: 'kick',
            group: 'guild',
            description: 'Kicks a tagged member.',
            examples: [`${config.prefix }kick [@user]`],
            guildOnly: true,
            userPermissions: ['KICK_MEMBERS'],
            clientPermissions: ['KICK_MEMBERS'],
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
            return message.channel.send(':x: Please try again with a valid user.');
        user
            .kick(reason)
            .then(() => {
                const kickEmbed = new MessageEmbed()
                    .addField('Kicked:', userToKick)
                    .addField('Reason:', reason)
                    .setColor('RANDOM')
                message.channel.send(kickEmbed);
            })
            .catch(err => {
                message.channel.send(
                    ':x: Something went wrong.... If the problem continues, please contact support.'
                );
                return console.error(err);
            });
    }
};