const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const {
    prefix,
} = require('../../config.json');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['h'],
            group: 'twitchbot',
            memberName: 'help',
            description: "TwitchBot Help",
            examples: [
                `${prefix}help`
            ],
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle(`${this.client.user.username} Help`)
            .setDescription("TwitchBot is a Multi-Purpose bot with plenty of different features to enjoy.\n\nTo start using TwitchBot, simply invite **TwitchBot Maid** into your server. \n\n")
            .addField("TwitchBot Maid", "**Invite**: [Link](https://discord.com/api/oauth2/authorize?client_id=857756784709075004&permissions=574094928&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot)", false)
            .addField("Support", "**MountainT Development**: [Link](https://discord.me/mtdev)\n**Discord Coding Community**: [Link](https://discord.me/discord-coding-community)", false)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(`Type t!bump to bump TwitchBot on top.gg`, this.client.user.displayAvatarURL())
        message.embed(embed);
        return;
    } catch (err) {
        console.error(err)
        message.reply(
            `\`\`\`css\n[ERROR] Discord API Error: ${err.code} [${err.message}]\n\`\`\``
        )
    };
};
