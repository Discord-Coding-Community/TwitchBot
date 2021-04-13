const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const client - require('discord.js');
const config = require('../../config.json');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: [
                'shardstatus',
                'status',
                'shard'
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
        let values = await client.shard.broadcastEval(`
    [
        this.shard.id,
        this.guilds.size
    ]
`);

        values.forEach((value) => {
            let embed = new MessageEmbed()
                .setTitle('TwitchBot')
                .setDescription('Twitch Integration bot built with `Discord.JS-Commando` and Twitch API.')
                .addField('Shard', value[0], true)
                .addField('Guilds', value[1], true)
                .addField('Prefix', config.prefix, true)
                .addField('Owners', config.owner_tag_1 + ',\n' + config.owner_tag_2, true)
                .addField('Github', '[' + config.github_team_name + '](https://github.com/' + config.github_team + '/' + config.github_repo + ')', true)
                .setThumbnail(this.client.user.displayAvatarURL())
                .setColor('RANDOM')
                .setTimestamp(new Date().toISOString())
                .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
            message.channel.send(embed)
        })
    }
};