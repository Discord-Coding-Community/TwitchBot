const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const { 
    prefix,
} = require('../../config.json');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'about',
            aliases: [
                'botinfo'
            ],
            memberName: 'about',
            group: 'twitchbot',
            description: "Displays the bot's info.",
            examples: [
                `${prefix}about`
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
            .setTitle(this.client.user.username + ' Information')
            .setDescription(`Information about ${this.client.user.username} and it's instances.`)
            .addField('TwitchBot', `**Prefix**: \`t!\`\n**Description**:\nPrimary Gateway Instance`, true)
            .addField('TwitchMusic', `**Prefix**: \`m!\`\n**Description**:\nMusic and Audio Commands Instance`, true)
            .addField('TwitchUtils', `**Prefix**: \`u!\`\n**Description**:\nUtility and Fun Commands Instance`, true)
            .addField('TwitchGaurdian', `**Prefix**: \`g!\`\n**Description**:\nAdministration and Moderation Commands Instance`, true)
            .addField('TwitchEconomy', `**Prefix**: \`e!\`\n**Description**:\nEconomy and Levels Commands Instance`, true)
            .addField('TwitchStreams', `**Prefix**: \`s!\`\n**Description**:\nStream Integration Commands Instance`, true)
            .addField('Total Users', memberCount, true)
            .addField('Total Channels', this.client.channels.cache.size, true)
            .addField('Total Guilds', this.client.guilds.cache.size, true)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed)
    } catch (err) {
        console.error(err)
        message.reply(
            `\`\`\`css\n[ERROR] Discord API Error: ${err.code} [${err.message}]\n\`\`\``
        )
    };
};
