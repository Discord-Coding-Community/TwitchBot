const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const {
    prefix,
    Music_Commands,
    Guild_Commands,
    GIF_Commands,
    Speedrun_Commands,
    Utility_Commands,
    Other_Commands,
    Policy,
    API_Usage,
    Support_Server_Name_1,
    Support_Server_Name_2,
    Support_Server_Invite_1,
    Support_Server_Invite_2,
    RedBot_Name,
    RedBot_Invite_URL
} = require('../../config.json');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'help',
            aliases: ['h'],
            group: 'other',
            memberName: 'help',
            description: "TwitchBot Help",
            examples: [
                prefix + 'help'
            ],
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setThumbnail(this.client.user.name + ' Help')
            .setDescription(`**__TwitchBot__**\n\nMusic Commands: [Link](${Music_Commands})\nGuild Commands: [Link](${Guild_Commands})\nGIF Commands: [Link](${GIF_Commands})\nSpeedrun Commands: [Link](${Speedrun_Commands})\nOther Commands: [Link](${Other_Commands})\nUtility Commands: [Link](${Utility_Commands})\n\n**__Privacy and API__**\n\nPrivacy Policy: [Link](${Policy})\nAPI Usage: [Link](${API_Usage})\n\n**__Notice__**\n\nThe base version of **TwitchBot** carries a limited amount of functionality.\n\nTo get the full functionality you need to invite our instance of **RedBot**.\n\n **__RedBot Features__**\n\n:white_small_square: Twitch, YouTube, Smashcast, and Picarto stream integration\n:white_small_square: Autoplay support in the Music Player\n:white_small_square: Image Commands\n:white_small_square: Per Guild Configuration\n:white_small_square: much, much, more...\n\nYou can invite our instance of **RedBot** from the following link : [${RedBot_Name}](${RedBot_Invite_URL})\n\n**__Support__**\n\n:white_small_square: [${Support_Server_Name_1}](${Support_Server_Invite_1})\n:white_small_square: [${Support_Server_Name_2}](${Support_Server_Invite_2})`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .setColor('RANDOM')
            .setTimestamp()
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        message.embed(embed);
        return;
    }
};
