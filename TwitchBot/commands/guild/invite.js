const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const { invite } = require('../../../TwitchBot/config/config.json');

// Only if invite is in config.json and set to true
if (!invite) return;

module.exports = class InviteCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            group: 'guild',
            memberName: 'invite',
            description: 'Replies with a link to invite the bot.'
        });
    }

    async run(message) {
        //provides the link with admin permissions
        const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${this.client.user.id}&permissions=536346230&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot`;

        const guildCacheMap = this.client.guilds.cache;
        const guildCacheArray = Array.from(guildCacheMap, ([name, value]) => ({
            name,
            value
        }));
        let memberCount = 0;
        for (let i = 0; i < guildCacheArray.length; i++) {
            memberCount = memberCount + guildCacheArray[i].value.memberCount;
        }

        const embed = new MessageEmbed()
            .setTitle(this.client.user.username + ': Invite Link')
            .setColor('RANDOM')
            .setURL(inviteURL)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setDescription(
                `**Currently**
        On ${this.client.guilds.cache.size} servers, with a total of ${memberCount} users.`
            )
            .setFooter(
                'Operated by ' + this.client.owners[0].username + ' since',
                this.client.owners[0].displayAvatarURL()
            )
            .setTimestamp(this.client.user.createdAt);

        message.channel.send(embed)
            .then(console.log()
                .catch(e => {
                    console.error(e);
                    return message.reply('```css\n[ERROR] Discord API Error:' + e.code + '[' + e.message + ']\n```\n\nPlease contact TwitchBot\'s developers at `https://dsc.gg/mtdev` to report this error.');
                })
            );
    };
};