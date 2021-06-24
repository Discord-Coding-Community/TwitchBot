const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const {
    prefix,
    TwitchMusic_Invite_URL,
    TwitchStreams_Invite_URL,
    TwitchGaurdian_Invite_URL,
    TwitchUtils_Invite_URL,
    TwitchEconomy_Invite_URL,
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
            .setThumbnail(this.client.user.name + ' Help')
            .setDescription(`**TwitchBot uses a series of seperate bots to seperate it's features so that users will only have what they want and/or use.\nTo get the features you desire, simply invite our seperate instances from the links below:\n:white_small_square:[TwitchMusic](${TwitchMusic_Invite_URL}\n:white_small_square:[TwitchStreams](${TwitchStreams_Invite_URL}\n:white_small_square:[TwitchGuardian](${TwitchGaurdian_Invite_URL}\n:white_small_square:[TwitchUtils](${TwitchUtils_Invite_URL}\n:white_small_square:[TwitchEconomy](${TwitchEconomy_Invite_URL}\n\n**__Support__**\n\n:white_small_square: [${Support_Server_Name_1}](${Support_Server_Invite_1})\n:white_small_square: [${Support_Server_Name_2}](${Support_Server_Invite_2})`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(this.client.user.name, this.client.user.displayAvatarURL());
        message.embed(embed);
        return;
    } catch (err) {
        console.error(err)
        message.reply(
            `\`\`\`css\n[ERROR] Discord API Error: ${err.code} [${err.message}]\n\`\`\``
        )
    };
};