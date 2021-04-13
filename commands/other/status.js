const { MessageEmbed } = require('discord.js');
const { Command } = require('discord.js-commando');
const config = require('../../config.json');

module.exports = class AboutCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'status',
            aliases: [
                'shardstatus',
                'status',
                'shard'
            ],
            memberName: 'status',
            group: 'other',
            description: "Displays the bot's status.",
            examples: [
                config.prefix + 'status'
            ],
            userPermissions: ['SEND_MESSAGES'],
            clientPermission: ['SEND_MESSAGES']
        });
    }

    async run(message) {
        let values = await this.client.shard.broadcastEval(`
    [
        this.shard.id,
        this.guilds.size
    ]
`);
        let finalString = "**SHARD STATUS**\n\n";
        values.forEach((value) => {
            finalString += "• **Shard**: " + value[0] + " | **Guilds**: " + value[1] + " | **Users**: " + value[2] + "\n";
        });
        let embed = new MessageEmbed()
            .setTitle(this.client.user.username)
            .setDescription(finalString)
            .setColor('RANDOM')
            .setTimestamp(new Date().toISOString())
            .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        message.channel.send(embed);
        return;
    } catch (e) {
        console.error(e)
        channel.send(
            '```css\n[ERROR] ' + err.code + ': [' + err.message + ']\n```'
        )
    }
};