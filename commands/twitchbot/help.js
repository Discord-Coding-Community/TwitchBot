const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const {
    prefix,
    Support_Server_Name_1,
    Support_Server_Name_2,
    Support_Server_Invite_1,
    Support_Server_Invite_2,
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
            .setThumbnail('TwitchBot Help')
            .setDescription(`**TwitchBot** uses a series of seperate bots to seperate it's features so that users will only have what they want.\n\nTo get the features you desire, simply invite your preferred instances.\n\n:white_small_square: **Instances**: [Link](https://discord-coding-community.gitbook.io/discord-coding-community/twitchbot#instances)\n\n:white_small_square: **Commands**: [Link](https://discord-coding-community.gitbook.io/discord-coding-community/twitchbot#commands)\n\n**__Support__**\n\n:white_small_square: [${Support_Server_Name_1}](${Support_Server_Invite_1})\n:white_small_square: [${Support_Server_Name_2}](${Support_Server_Invite_2})`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter('TwitchBot', this.client.user.displayAvatarURL());
        message.embed(embed);
        return;
    } catch (err) {
        console.error(err)
        message.reply(
            `\`\`\`css\n[ERROR] Discord API Error: ${err.code} [${err.message}]\n\`\`\``
        )
    };
};
