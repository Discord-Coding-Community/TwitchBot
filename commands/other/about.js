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
        const promises = [];

        return Promise.all(promises)
            .then(results => {
                const totalGuilds = results[0].reduce((acc, guildCount) => acc + guildCount, 0);
                const totalMembers = results[1].reduce((acc, memberCount) => acc + memberCount, 0);
                const totalChannels = results[2].reduce((acc, channelCount) => acc + channelCount, 0);
                let embed = new MessageEmbed()
                    .setTitle('TwitchBot')
                    .setDescription('Twitch Integration bot built with `Discord.JS-Commando` and Twitch API.')
                    .addField('Users', totalMembers, true)
                    .addField('Channels', totalGuilds, true)
                    .addField('Guilds', totalChannels, true)
                    .addField('Prefix', config.prefix, true)
                    .addField('Owners', `${config.owner_tag_1},\n${config.owner_tag_2}`, true)
                    .addField('Github', `[${config.github_team_name}](https://github.com/${config.github_team}/${config.github_repo})`, true)
                    .setThumbnail(this.client.user.displayAvatarURL())
                    .setColor('RANDOM')
                    .setTimestamp(new Date().toISOString())
                    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
                message.channel.send(embed)
            })
    }
};