const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Link = require("dsc.js");
const {
    prefix,
    invite,
    RedBot_Name,
    RedBot_Invite_URL,
    topgg_client_id,
    dsc_API,
    dsc_Invite_URL,
    Support_Server_Invite_1,
    Support_Server_Invite_2,
    Support_Server_Name_1,
    Support_Server_Name_2
} = require('../../config.json');

if (!invite) return;

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['inv', 'i'],
            group: 'guild',
            memberName: 'invite',
            examples: [prefix + 'invite'],
            description: 'Replies with a link to invite the client.'
        });
    }

    async run(message) {
        const invite_URL = 'https://top.gg/bot/' + topgg_client_id + '/invite/';
        const embed = new MessageEmbed()
            .setTitle(this.client.user.username + ' Official Invites')
            .setDescription('A list of invites for ' + this.client.user.username)
            .setColor('RANDOM')
            .addField('TwitchBot', ':white_small_square: [Top.gg](' + invite_URL + ')' + '\n:white_small_square: [dsc.gg](' + dsc_Invite_URL + ')', false)
            .addField('Support Servers', ':white_small_square: [' + Support_Server_Name_1 + '](' + Support_Server_Invite_1 + ')\n:white_small_square: [' + Support_Server_Name_2 + '](' + Support_Server_Invite_2 + ')', false)
            .addField('RedBot', ':white_small_square: [' + RedBot_Name + '](' + RedBot_Invite_URL + ')', false)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        message.channel.send(embed)
    }
};