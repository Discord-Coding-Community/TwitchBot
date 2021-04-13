const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: [
                'stats'
            ],
            memberName: 'status',
            group: 'other',
            description: "Displays the bot's status.",
            examples: [
                config.prefix + 'status'
            ],
            userPermissions: ['SEND_MESSAGES'],
            clientPermission: ['SEND_MESSAGES']
        });
    }

    async run(message) {
        let values = await this.client.shard.broadcastEval(`[this.shard.id, this.guilds.size]`);
        let finalString = "**SHARD STATUS**\n\n";
        values.forEach((value) => {
            finalString += " • **Shard**: " + value[0] + " | • **Guilds**: " + value[1] + " • | **Users**: " + value[2] + "\n";
            let embed = new MessageEmbed()
                .setTitle(this.client.user.username)
                .setDescription('Twitch Integration bot built with `Discord.JS-Commando` and Twitch API.\n\n' + finalString)
                .setColor('RANDOM')
                .addField('Online Members', message.guild.members.cache.filter(member => member.presence.status !== "offline").size, false)
                .addField('Online Members', message.guild.members.cache.filter(member => member.presence.status == "offline").size, false)
                .setTimestamp(new Date().toISOString())
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            message.channel.send(embed);
            return;
        })
    }
};