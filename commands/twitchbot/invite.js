const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const {
    prefix,
} = require('../../config.json');

module.exports = class AvatarCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'invite',
            aliases: ['i', 'inv'],
            group: 'twitchbot',
            memberName: 'invite',
            description: "TwitchBot Instance Invites",
            examples: [
                `${prefix}invite`
            ],
        });
    }

    async run(message) {
        const embed = new MessageEmbed()
            .setTitle(`${this.client.user.username} Instances`)
            .setThumbnail(this.client.user.displayAvatarURL())
            .addField('TwitchBot', `**Invite**: [Link](https://discord.com/api/oauth2/authorize?client_id=779442792324661249&permissions=125952&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Ftoken&scope=bot)\n**Prefix**: \`m!\``, true)
            .addField('TwitchMusic', `**Invite**: [Link](https://discord.com/api/oauth2/authorize?client_id=846021695693127710&permissions=36961280&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot)\n**Prefix**: \`m!\``, true)
            .addField('TwitchUtils', `**Invite**: [Link](https://discord.com/api/oauth2/authorize?client_id=857768812332711966&permissions=2117598801&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot)\n**Prefix**: \`u!\``, true)
            .addField('TwitchGaurdian', `**Invite**: [Link](https://discord.com/api/oauth2/authorize?client_id=783958910536646658&permissions=536870646&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot)\n**Prefix**: \`g!\``, true)
            .addField('TwitchEconomy', `**Invite**: [Link](https://discord.com/api/oauth2/authorize?client_id=857770441376399371&permissions=2118123249&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot)\n**Prefix**: \`e!\``, true)
            .addField('TwitchStreams', `**Invite**: [Link](https://discord.com/api/oauth2/authorize?client_id=857756784709075004&permissions=574094928&redirect_uri=https%3A%2F%2Fdiscord.com%2Fapi%2Foauth2%2Fauthorize&scope=bot)\n**Prefix**: \`s!\``, true)
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
