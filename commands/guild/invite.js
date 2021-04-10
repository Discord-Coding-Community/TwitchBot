const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const Link = require("dsc.js");
const config = require('../../config.json');

if (!config.invite) return;

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['inv', 'i'],
            group: 'guild',
            memberName: 'invite',
            examples: [config.prefix + 'invite'],
            description: 'Replies with a link to invite the client.'
        });
    }

    async run(message) {
        const inviteURL = 'https://discord.com/api/oauth2/authorize?client_id=$' + this.client.user.id + '&permissions=8&scope=bot';
        const dsc = new Link.Client(config.dscAPI)
        dsc.fetchLink("discord").then((link) => {
            const embed = new MessageEmbed()
            .setTitle(this.client.user.username)
            .setDescription('A list of invites for ' + this.client.user.username)
            .setColor('RANDOM')
            .addField('TwitchBot', ':white_small_square: [Top.gg](' + inviteURL + ')' + '\n:white_small_square: [dsc.gg](' + config.dscInviteURL + ')', true)
            .addField('Support Servers', ':white_small_square: [' + config.Support_Server_Name_1 + '](' + config.Support_Server_Invite_1 + ')\n:white_small_square: [' + config.Support_Server_Name_2 + '](' + config.Support_Server_Invite_2 + ')' , true)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        message.channel.send(embed)
        })
    }
};