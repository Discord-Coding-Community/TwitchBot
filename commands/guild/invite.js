const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { invite, prefix, server_invite_1, server_invite_2 } = require('../../config.json');

if (!invite) return;

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'guild',
            memberName: 'invite',
            examples: [`${prefix}invite`],
            description: 'Replies with a link to invite the client.'
        });
    }

    async run(message) {
        const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=8&scope=bot`;

        const embed = new MessageEmbed()
            .setTitle(this.client.user.username)
            .setDescription('A list of invites for ' + this.client.user.username)
            .setColor('RANDOM')
            .addField('TwitchBot', `[Invite](${inviteURL})`, true)
            .addField('MountainT Development', `[Invite](${server_invite_1})`, true)
            .addField('Discord Coding Community', `[Invite](${server_invite_2})`, true)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        message.channel.send(embed);
    }
};