const { Command } = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class NicknameCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'nickname',
            aliases: ['set-nick', 'set-nickname'],
            group: 'guild',
            memberName: 'nickname',
            description: "Sets the selected member's nickname with the provided nickname",
            clientPermissions: ['MANAGE_NICKNAMES'],
            userPermissions: ['MANAGE_NICKNAMES'],
            guildOnly: true,
            args: [{
                    key: 'memberName',
                    prompt: 'Which member do you want to change the nickname of?',
                    type: `member`,
                    error: ':x: Member not found, please try again.'
                },
                {
                    key: 'nickname',
                    prompt: 'What name do you want to change their nickname to?',
                    type: 'string'
                }
            ]
        });
    }

    async run(message, { memberName, nickname }) {
        if (nickname === 'remove') {
            try {
                await memberName.setNickname('');
            } catch {
                message.reply(
                    `:x: Can't change nickname, requested member has a higher role than you`
                );
                return;
            }
            try {
                let embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Nickname Cleared!')
                    .addField('Member', `${memberName.user.username}`)
                    .addField('Moderator', `${message.author}`)
                    .setThumbnail(memberName.user.displayAvatarURL({ dynamic: true }))
                    .setFooter('Cleared', message.author.displayAvatarURL())
                    .setTimestamp()
                    .setTimestamp(new Date().toISOString())
                    .setFooter('TwitchBot', 'https://cdn.discordapp.com/avatars/779442792324661249/26206ede07f20447bf380df44b429db7.png')

                if (message.deletable) {
                    message.delete();
                }
                message.channel.send(embed);
                return;
            } catch {
                message.reply(':x: Something went wrong removing nickname');
                return;
            }
        } else {
            const oldName = memberName.displayName;
            try {
                await memberName.setNickname(nickname);
            } catch {
                message.reply(
                    `:x: Can't change nickname, requested member has a higher role than you`
                );
                return;
            }
            try {
                let embed = new Discord.MessageEmbed()
                    .setColor('RANDOM')
                    .setTitle('Nickname Changed!')
                    .addField('Member', `${memberName.user.username}`)
                    .addField('Old Name', `${oldName}`)
                    .addField('New Name', `${nickname}`)
                    .addField('Moderator', `${message.author}`)
                    .setThumbnail(memberName.user.displayAvatarURL({ dynamic: true }))
                    .setFooter('Changed', message.author.displayAvatarURL())
                    .setTimestamp();

                if (message.deletable) {
                    message.delete();
                }

                message.channel.send(embed);
                return;
            } catch {
                message.reply(':x: Something went wrong when changing nickname');
                return;
            }
        }
    }
};