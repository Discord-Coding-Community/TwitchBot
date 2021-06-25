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
            .setDescription(`\`\`\`\nTwitchBot is a Multi-Purpose bot with plenty of different features to enjoy.\n\nTo start using TwitchBot, simply type [p]invite and invite your preferred instances.\n\nNote that [p] stands for the bot prefix.\n\`\`\`\n\n:white_small_square: **Commands**: \`[p]help\`, \`[p]invite\`, \`[p]about\`\n\n**__Support__**\n\n:white_small_square: [MountainT Development](https://discord.me/mtdev)\n:white_small_square: [Discord Coding Community](https://discord.me/discord-coding-community)`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.embed(embed);
        return;
    } catch (err) {
        console.error(err)
        message.reply(
            `\`\`\`css\n[ERROR] Discord API Error: ${err.code} [${err.message}]\n\`\`\``
        )
    };
};
