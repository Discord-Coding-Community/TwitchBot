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
        .setTitle(`${this.client.user.username} Help`)
        .setDescription(`The default prefix for ${this.client.user.username} is \`t!\`.`)
        .addField("Music Commands", `[Link](${Music_Commands})`, true)
        .addField("Guild Commands", `[Link](${Guild_Commands})`, true)
        .addField("GIF Commands", `[Link](${GIF_Commands})`, true)
        .addField("Speedrun Commands", `[Link](${Speedrun_Commands})`, true)
        .addField("Other Commands", `[Link](${Other_Commands})`, true)
        .addField("Utility Commands", `[Link](${Utility_Commands})`, true)
        .addField("Information", `The base version of TwitchBot carries a limited amount of functionality.\n\nTo get the full functionality you need to invite our instance of RedBot.`, false)
        .addField("RedBot Features", `:white_small_square: Twitch, YouTube, Smashcast, and Picarto stream integration\n:white_small_square: Autoplay support in the Music Player\n:white_small_square: Image Commands\n:white_small_square: Per Guild Configuration\n:white_small_square: much, much, more...`, false)
        .addField("RedoBot Invite", `[Link](${RedBot_Invite_URL})`, false)
        .addField("Support Servers", `:white_small_square: [${Support_Server_Name_1}](${Support_Server_Invite_1})\n:white_small_square: [${Support_Server_Name_2}](${Support_Server_Invite_2})`, true)
        .addField("Privacy and API", `:white_small_square: [Privacy Policy](${Policy})\n:white_small_square: [API Usage](${API_Usage})`, true)
        .setThumbnail(this.client.user.displayAvatarURL())
        .setColor('RANDOM')
        .setTimestamp()
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL());
        message.embed(embed);
        return;
    }
};
