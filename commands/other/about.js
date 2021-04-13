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

        const guildCacheMap = this.client.guilds.cache;
        const guildCacheArray = Array.from(guildCacheMap, ([name, value]) => ({
            name,
            value
        }));
        let memberCount = 0;
        for (let i = 0; i < guildCacheArray.length; i++) {
            memberCount = memberCount + guildCacheArray[i].value.memberCount;
        }

        let embed = new MessageEmbed()
            .setTitle('TwitchBot')
            .setDescription('Twitch Integration bot built with `Discord.JS-Commando` and Twitch API.')
            .addField('Users', memberCount, true)
            .addField('Channels', this.client.channels.cache.size, true)
            .addField('Guilds', this.client.guilds.cache.size, true)
            .addField('Prefix', config.prefix, true)
            .addField('Owners', config.owner_tag_1 + ',\n' + config.owner_tag_2, true)
            .addField('Github', '[' + config.github_team_name + '](https://github.com/' + config.github_team + '/' + config.github_repo + ')', true)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed)
    } catch (e) {
        console.error(e)
        channel.send(
            '```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```'
        )
    }
};