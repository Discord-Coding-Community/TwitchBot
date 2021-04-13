const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            aliases: [
                'botinfo'
            ],
            memberName: 'about',
            group: 'other',
            description: "Displays the bot's info.",
            examples: [
                `${config.prefix}about`
            ]
        });
    }

    run(message) {

        const promises = [
            client.shard.fetchClientValues('guilds.cache.size'),
            client.shard.broadcastEval('this.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)'),
        ];

        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                let embed = new MessageEmbed()
                    .setTitle('TwitchBot')
                    .setDescription('Twitch Integration bot built with `Discord.JS-Commando` and Twitch API.')
                    .addField('Users', totalMembers, true)
                    .addField('Guilds', totalGuilds, true)
                    .addField('Prefix', config.prefix, true)
                    .addField('Owners', `${config.owner_tag_1},\n${config.owner_tag_2}`, true)
                    .addField('Github', `[${config.github_team_name}](https://github.com/${config.github_team}/${config.github_repo})`, true)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setColor('RANDOM')
                    .setTimestamp(new Date().toISOString())
                    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                return message.channel.send(embed);
            })
    }
};